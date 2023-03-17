defmodule MousersWeb.PageController do
  use MousersWeb, :controller

  def home(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :home, layout: false)
  end

  def vite(conn, _params) do
    redirect(conn, externel: "http://localhost:3000/__vite_ping")
  end
end
