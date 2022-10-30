import { app, BrowserWindow, MessageChannelMain, MessagePortMain } from "electron";
import { Window } from "./Window.js";

const createWindow = () => {
  const win = new Window("@app/renderer", {
    height: 1000,
    width: 1000,

  });
  win.on("message-port", ({ port, id }) => { console.log(port, id); port.on("message", console.log); port.start(); });
  let port = win.shareMessageChannel("main");
  let { port1 } = new MessageChannelMain();
  try {
    port.postMessage({ test: "maintest", port1 }, [<MessagePortMain><unknown>port1]);
  } catch (e) {
    console.log(e);
  }
  win.webContents.openDevTools();
  return win;
};

app.whenReady().then(() => {
  let win1 = createWindow();
  win1;
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});