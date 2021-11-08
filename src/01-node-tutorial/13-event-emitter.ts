import EventEmitter from "events";

const customEmitter = new EventEmitter();

// Order Matters
customEmitter.on("response", () => {
  console.log(`data received`);
});
customEmitter.on("response", () => {
  console.log(`some other login here`);
});
customEmitter.on("response", (name, id) => {
  console.log(`data received, user ${name} with id:${id}`);
});

// customEmitter.emit("response");
customEmitter.emit("response", "john", 34);
