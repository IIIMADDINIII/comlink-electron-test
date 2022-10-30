import { addMessagePortListener } from "./messagePort.js";
import * as messagePort from "./messagePort.js";
debugger;
(<any>window).messagePort = messagePort;

addMessagePortListener((event) => {
  console.log(event.detail);
});
messagePort.shareMessageChannel("renderer");