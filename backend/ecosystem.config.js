module = {
  apps: [{
    name: "hipro-empanelment-backend",
    script: "./server.js",
    instances: "max",
    exec_mode: "cluster",
    env: {
      NODE_ENV: "production",
      PORT: 9000
    }
  }]
};
