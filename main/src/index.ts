import { app, BrowserWindow } from "electron";
import { Window } from "./Window.js";

const createWindow = () => {
  const win = new Window("@app/renderer", {
    height: 1000,
    width: 1000,

  });
  win.on("message-port", console.log);
  win.shareMessageChannel("main");
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