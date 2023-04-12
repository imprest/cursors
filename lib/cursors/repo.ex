defmodule Cursors.Repo do
  use Ecto.Repo,
    otp_app: :cursors,
    adapter: Ecto.Adapters.Postgres
end
