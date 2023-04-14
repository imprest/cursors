defmodule CursorsWeb.SolidHTML do
  use CursorsWeb, :html

  def index(assigns) do
    ~H"""
    <%= if System.get_env("PHX_SERVER", "false") == "false" do %>
      <script src="http://localhost:3000/src/index.tsx" type="module">
      </script>
    <% else %>
      <script defer phx-track-static type="text/javascript" src={~p"/assets/index.js"}>
      </script>
    <% end %>
    <noscript>You need to enable Javascript to run this app.</noscript>
    <div id="root"></div>
    """
  end
end
