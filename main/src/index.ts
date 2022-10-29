import { app, BrowserWindow } from "electron";

const createWindow = () => {
  const win = new BrowserWindow({
    height: 1000,
    width: 1000,
    webPreferences: { preload: require.resolve("@app/preload") },
  });
  win.loadFile(require.resolve("@app/renderer"));
  win.webContents.openDevTools();
  console.log("started");
  win.webContents.ipc.on("test", console.log);
  return win;
};

app.whenReady().then(() => {
  let _win1 = createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});