const express = require("express");
const fs = require("fs/promises");
const app = express();
const jokesDB = require("devpun/jokes.json");
const devpun = require("devpun");
const port = process.env.PORT || 3000;

console.log(devpun.list("react"));
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "<deployed URL>"],
//   })
// );

app.get("/", (req, res) => {
  res.json(jokesDB);
});

app.get("/random", (req, res) => {
  res.json(devpun.random());
});

app.get("/by-category", (req, res) => {
  const byCategory = req.query.name;
  if (!byCategory) {
    res.sendStatus(400);
  }
  console.log(devpun.list(byCategory));
  res.json(devpun.list(byCategory));
});

app.get("/search", (req, res) => {
  const searched = jokesDB
    .filter((joke) => joke.text.includes(req.query.text))
    .map((joke) => joke.text);
  res.json(searched);
});

app.get("/popular", (req, res) => {
  const popular = jokesDB
    .filter((joke) => joke.rating === 1)
    .map((joke) => joke.text);
  res.json(popular);
});
app.get("/categories", (req, res) => {
  const categories = jokesDB
    .map((joke) => joke.tags)
    .reduce((acc, tag) => {
      return [...acc, ...tag];
    }, []);
  const noRepetitionCtegories = Array.from(new Set(categories));
  res.json(noRepetitionCtegories);
});
app.listen(port, () => {
  console.log(`on server http://localhost:${port}`);
});
