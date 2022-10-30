import { addMessagePortListener } from "./messagePort.js";
import * as messagePort from "./messagePort.js";
debugger;
(<any>window).messagePort = messagePort;

addMessagePortListener((event) => {
  console.log(event.detail);
  event.detail.port.addEventListener("message", console.log);
  event.detail.port.start();
});
let port = messagePort.shareMessageChannel("renderer");
let ab = new ArrayBuffer(10);
port.postMessage({ test: "test", ab }, [ab]);