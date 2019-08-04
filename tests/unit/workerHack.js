export default function workerHack() {
  class Worker {
    constructor(stringUrl) {
      this.url = stringUrl;
      this.onmessage = () => {};
    }

    postMessage(msg) {
      msg.type = "log";
      msg.data = "Hack";
      this.onmessage(msg);
    }
  }

  window.Worker = Worker;
  window.URL.createObjectURL = jest.fn();
}
