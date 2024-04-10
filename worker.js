import { sqlite3Worker1Promiser } from "@sqlite.org/sqlite-wasm";
import { TYPES } from "./constant";

const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const log = (type, ...args) => {
  console.log(type, ...args);
  if (type === TYPES.TABLE) {
    self.postMessage({ type, columns: args[0].columns, rows: args[0].rows});
  } else if (type === TYPES.LOG) {
    self.postMessage({ type, message: args.join(" ") });
  } else {
    self.postMessage({ type, message: args.join(" ") });
  }
};

const error = (type, ...args) => {
  console.error(...args);
  args.unshift(RED);
  args.push(RESET);
  postMessage({
    type,
    message: args.join(" "),
  });
};

(async () => {
  try {
    log(TYPES.LOG, "Loading and initializing SQLite3 module...");

    const db = await new Promise((resolve) => {
      const _promiser = sqlite3Worker1Promiser({
        onready: () => {
          resolve(_promiser);
        },
      });
    });

    let response;

    response = await db("config-get", {});
    log(
      TYPES.LOG,
      "Running SQLite3 version",
      response.result.version.libVersion
    );

    response = await db("open", {
      filename: "file:db.sqlite3?vfs=opfs",
    });
    const { dbId } = response;
    log(
      TYPES.LOG,
      "OPFS is available, created persisted database at",
      response.result.filename.replace(/^file:(.*?)\?vfs=opfs$/, "$1")
    );

    log(TYPES.PROMPT);

    self.onmessage = (e) => {
      const command = e.data;
      let rows = [];

      db("exec", {
        dbId,
        sql: command,
        callback: (result) => {
          if (!result.row) {
            return;
          }
          rows.push(result.row);
        },
      })
        .then((result) => {
          if (result?.result?.columnNames.length > 0) {
            log(
              TYPES.TABLE,
              {
                columns: result?.result?.columnNames,
                rows,
              }
            );
          } else {
            log(TYPES.PROMPT, result.result.message);
          }
        })
        .catch((err) => {
          console.log(err);
          const message = err.result.message;
          error(TYPES.ERROR, message);
        });
    };
  } catch (err) {
    if (!(err instanceof Error)) {
      err = new Error(err.result.message);
    }
    error(err.name, err.message);
  }
})();
