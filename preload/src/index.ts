import { ipcRenderer } from "electron";
console.log("test");
let { port1: mainPort, port2: _rendererPort } = new MessageChannel();
ipcRenderer.postMessage("test", { type: "data" }, [mainPort]);