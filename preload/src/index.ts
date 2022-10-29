import { ipcRenderer } from "electron";
console.log("test");
let { port1: mainPort, port2: rendererPort } = new MessageChannel();
ipcRenderer.postMessage("test", { type: "data" }, [mainPort]);