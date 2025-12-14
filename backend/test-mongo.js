require("./config/mongodb");

setTimeout(() => {
  console.log("MongoDB test completed");
  process.exit();
}, 2000);
