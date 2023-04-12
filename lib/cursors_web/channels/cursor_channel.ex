defmodule CursorsWeb.CursorChannel do
  use CursorsWeb, :channel

  alias CursorsWeb.Presence
  alias Cursors.Colors

  @impl true
  def join("cursor:lobby", payload, socket) do
    if authorized?(payload) do
      # TODO on join if users 2nd tab; sync metas msg with previous tab
      send(self(), :after_join)
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  intercept(["msg_send"])

  @impl true
  def handle_out("msg_send", %{"msg" => msg, "name" => name}, socket) do
    if socket.assigns.name === name do
      {:ok, _} =
        Presence.update(socket, name, fn previousState ->
          Map.merge(
            previousState,
            %{
              online_at: inspect(System.system_time(:second)),
              msg: msg
            }
          )
        end)
    end

    {:noreply, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (cursor:lobby).
  @impl true
  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

  @impl true
  def handle_in("msg_send", %{"msg" => msg}, socket) do
    {:ok, _} =
      Presence.update(socket, socket.assigns.name, fn previousState ->
        Map.merge(
          previousState,
          %{
            online_at: inspect(System.system_time(:second))
          }
        )
      end)

    broadcast!(socket, "msg_send", %{"msg" => msg, "name" => socket.assigns.name})
    {:noreply, socket}
  end

  def handle_in("move", %{"x" => x, "y" => y}, socket) do
    {:ok, _} =
      Presence.update(socket, socket.assigns.name, fn previousState ->
        Map.merge(
          previousState,
          %{
            time: :erlang.monotonic_time(),
            online_at: inspect(System.system_time(:second)),
            x: x,
            y: y,
            color: Colors.getHSL(socket.assigns.name)
          }
        )
      end)

    {:noreply, socket}
  end

  @impl true
  def handle_info(:after_join, socket) do
    presence = Presence.get_by_key(socket, socket.assigns.name)
    metas = Map.get(presence, :metas)

    msg =
      case hd(metas) do
        [] -> ""
        meta -> Map.get(meta, :msg)
      end

    {:ok, _} =
      Presence.track(socket, socket.assigns.name, %{
        msg: msg,
        online_at: inspect(System.system_time(:second)),
        color: Colors.getHSL(socket.assigns.name)
      })

    push(socket, "presence_state", Presence.list(socket))
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
