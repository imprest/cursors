defmodule MousersWeb.CursorChannel do
  alias MousersWeb.Presence
  use MousersWeb, :channel

  @impl true
  def join("cursor:lobby", payload, socket) do
    if authorized?(payload) do
      send(self(), :after_join)
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
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
      Presence.update(socket, socket.assigns.current_user, fn previousState ->
        Map.merge(
          previousState,
          %{
            online_at: inspect(System.system_time(:second)),
            msg: msg
          }
        )
      end)

    {:noreply, socket}
  end

  def handle_in("move", %{"x" => x, "y" => y}, socket) do
    {:ok, _} =
      Presence.update(socket, socket.assigns.current_user, fn previousState ->
        Map.merge(
          previousState,
          %{
            online_at: inspect(System.system_time(:second)),
            x: x,
            y: y,
            color: Mousers.Colors.getHSL(socket.assigns.current_user)
          }
        )
      end)

    {:noreply, socket}
  end

  @impl true
  def handle_info(:after_join, socket) do
    {:ok, _} =
      Presence.track(socket, socket.assigns.current_user, %{
        online_at: inspect(System.system_time(:second)),
        color: Mousers.Colors.getHSL(socket.assigns.current_user)
      })

    push(socket, "presence_state", Presence.list(socket))
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
