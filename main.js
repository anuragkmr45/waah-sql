import "@xterm/xterm/css/xterm.css";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import LocalEchoController from "local-echo";
import { elementary } from "./theme";
import { TYPES } from "./constant";
import { table } from "./table";

const worker = new Worker(new URL("./worker.js", import.meta.url), {
  type: "module",
});

const terminal = new Terminal({
  convertEol: true,
  cursorBlink: true,
  cursorStyle: "bar",
  allowProposedApi: true,
  theme: elementary,
});

const localEcho = new LocalEchoController();
const fitAddon = new FitAddon();

terminal.loadAddon(fitAddon);
terminal.loadAddon(localEcho);

terminal.open(document.getElementById("terminal"));
fitAddon.fit();

window.onresize = () => {
  fitAddon.fit();
};

const banner = [
  "",
  "                       __               __",
  " _      ______ _____ _/ /_  _________ _/ /",
  "| | /| / / __ `/ __ `/ __ \\/ ___/ __ `/ / ",
  "| |/ |/ / /_/ / /_/ / / / (__  ) /_/ / /  ",
  "|__/|__/\\__,_/\\__,_/_/ /_/____/\\__, /_/   ",
  "                                 /_/      ",
  " Made with 💙  by @iamsahebgiri",
  "",
  "",
].join("\r\n");

terminal.writeln(banner);

worker.onmessage = (e) => {
  const data = e.data;
  switch (data.type) {
    case TYPES.PROMPT:
      prompt();
      break;
    case TYPES.LOG:
      localEcho.println(data.message);
      break;
    case TYPES.ERROR:
      localEcho.println(data.message);
      prompt();
      break;
    case TYPES.TABLE:
      localEcho.println(table(data.columns, data.rows));
      prompt();
      break;
  }
};

const runCommand = (command) => {
  if (command.startsWith("clear")) {
    terminal.clear();
    prompt();
    return;
  }
  worker.postMessage(command);
};

const prompt = () => {
  localEcho
    .read("\r\nsqlite> ")
    .then((command) => {
      runCommand(command);
    })
    .catch(alert);
};
