const express = require("express")
require("dotenv").config()

const app = express()

let connections = [];

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");
  connections.push(res);
});

const startTimer = setInterval(() => {
  const currentDate = (new Date).toUTCString();
  console.log(currentDate);
  connections.map((res) => {
    res.write(`${currentDate}\n`)
  });
}, process.env.INTERVAL);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

setTimeout(() => {
  clearInterval(startTimer);

  const currentDate = (new Date).toUTCString();
  console.log(`Closed at ${currentDate}`);
  connections.map((res) => {
    res.write(`Closed at ${currentDate}\n`)
    res.end();
  });

  server.close();

  connections = [];
}, process.env.STOP)
