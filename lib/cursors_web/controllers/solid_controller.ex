defmodule CursorsWeb.SolidController do
  use CursorsWeb, :controller

  def index(conn, _params) do
    render(conn, :index)
  end
end
