<p align="center">
  <a href="https://github.com/iamsahebgiri/waah-sql">
    <img alt="waah-sql" height="80" src="./public/favicon.svg">
  </a>
</p>
<h1 align="center">WaahSQL</h1>

<div align="center">

</div>

<br />

<div align="center">
  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square"
      alt="Standard" />
  </a>
  
  <img src="https://img.shields.io/github/languages/code-size/iamsahebgiri/waah-sql?style=flat-square" alt="Code size" />

  <img src="https://img.shields.io/github/license/iamsahebgiri/waah-sql?style=flat-square" alt="License" />

  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/iamsahebgiri/waah-sql?style=flat-square">

  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/iamsahebgiri/waah-sql?style=social">
</div>

## ⚡️ Introduction

WaahSQL is a POC which allows you to run SQL in browser using WebAssembly. You can export sqlite database as well. The database is persisted using OPFS. This also uses Web Worker to unblock the main thread and all the SQL query happens in worker thread, while main thread responsible for UI rendering which is taken care by xtermjs.

## 🎯 Features

- WebAssembly in web workers
- Persistent database with OPFS
- Web based terminal with xtermjs
- And much more, explore waah-sql

## ⚙️ Installation

Make sure you have [Node.js](https://nodejs.org/en/download/) installed.
Run this followed commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at http://localhost:5173/
npm run dev

# Build for production in the dist/ directory
npm run build
```

## 🌱 Third Party Libraries

- [xtermjs/xterm.js](https://github.com/xtermjs/xterm.js)
- [vitejs/vite](https://github.com/vitejs/vite)


## ‍💻 Author

- [@iamsahebgiri](https://github.com/iamsahebgiri)

## ⭐️ Contribute

If you want to say thank you and/or support the active development of waah-sql:

1. Add a GitHub Star to the project.
2. Tweet about the project on your Twitter.
3. Write a review or tutorial on Medium, Dev.to or personal blog.
4. Support the project by donating a cup of coffee.

## 🧾 License

MIT License Copyright (c) 2024 [Saheb Giri](https://github.com/iamsahebgiri).
