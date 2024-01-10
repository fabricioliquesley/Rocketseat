module.exports = {
  apps : [{
    name: "./src/server.js",
		// Caminho até o arquivo principal do servidor.
    script: "./src/server.js",
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}