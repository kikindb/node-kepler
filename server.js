const http = require("http");
const PORT = 3000;

const friends = [
  {
    id: 1,
    name: "Sir Isaac Newton",
  },
  {
    id: 2,
    name: "Albert Einstein",
  },
  {
    id: 3,
    name: "Nikola Tesla",
  },
];

const server = http.createServer((req, res) => {
  const items = req.url.split("/");
  if (items[1] === "/friends") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    if (items.length === 3) {
      const friendIndex = +items[2];
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
