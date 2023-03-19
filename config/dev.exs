import Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with esbuild to bundle .js and .css sources.
config :mousers, MousersWeb.Endpoint,
  # Binding to loopback ipv4 address prevents access from other machines.
  # Change to `ip: {0, 0, 0, 0}` to allow access from other machines.
  http: [ip: {127, 0, 0, 1}, port: 4000],
  check_origin: false,
  code_reloader: true,
  debug_errors: true,
  secret_key_base: "dGZOgO/DfF2ZdPXO9bTc9J/g0eoPoUYn3cj96H7kToo1v9ucEi7l/1jUZmYlnATF",
  watchers: [
    pnpm: ["run", "dev", cd: Path.expand("../assets", __DIR__)]
  ]

# ## SSL Support
#
# In order to use HTTPS in development, a self-signed
# certificate can be generated by running the following
# Mix task:
#
#     mix phx.gen.cert
#
# Run `mix help phx.gen.cert` for more information.
#
# The `http:` config above can be replaced with:
#
#     https: [
#       port: 4001,
#       cipher_suite: :strong,
#       keyfile: "priv/cert/selfsigned_key.pem",
#       certfile: "priv/cert/selfsigned.pem"
#     ],
#
# If desired, both `http:` and `https:` keys can be
# configured to run both http and https servers on
# different ports.

# Watch static and templates for browser reloading.
config :mousers, MousersWeb.Endpoint,
  live_reload: [
    patterns: [
      # ~r"priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$",
      # ~r"priv/gettext/.*(po)$",
      # ~r"lib/mousers_web/(controllers|live|components)/.*(ex|heex)$"
    ]
  ]

config :exsync, addition_dirs: ["/lib/mousers_web"]

# Enable dev routes for dashboard and mailbox
config :mousers, dev_routes: true

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Initialize plugs at runtime for faster development compilation
config :phoenix, :plug_init_mode, :runtime