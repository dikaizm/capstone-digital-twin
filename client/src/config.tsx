const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  wsUrl: import.meta.env.VITE_WS_URL,
  secretKey: import.meta.env.VITE_SECRET_KEY
}

function apiUrl() { return config.apiUrl }
function secretKey() { return config.secretKey }
function wsUrl() { return config.wsUrl }

export {
  apiUrl,
  wsUrl,
  secretKey
}