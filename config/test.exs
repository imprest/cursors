import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :mousers, MousersWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "ZbxgiGwg1VKGO6rXtR2YS8juD94n8rATf98hgB4NcNlz8qOEQ6mkgKtINnGP5W+v",
  server: false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
