const http = require('http');

http.createServer((req, res) => {
  res.end("🚀 Version 2 - Green Deployment");
}).listen(3000);
