const fs = require("fs");

const start = Date.now();

const log = (...args) => {
  const now = Date.now();
  console.log(`+ ${now - start} ms`, ...args);
}

function readAndCallback(callback) {
  log("readAndCallback - before fs.readFile()");
  fs.readFile("./css2.pdf", () => {
    // On a T480 w. SSD storage, this callback is invoked after about 10ms
    log("readAndCallback cb - after fs.readFile()");
    callback();
  });
}

const timeoutCallback = () => {
  log("timeoutCallback");
}
setTimeout(timeoutCallback, 20);

const block5ms = () => {
  log("block5ms - start")
  const now = Date.now();
  while (Date.now() - now < 5) {
  }
  log("block5ms - end")
}

readAndCallback(block5ms);
