//Node server which will handle socket io
const io = require("socket.io")(8000);

const user = {};

io.on("connection", (socket) => {
  socket.on("user-joined", (name) => {
    user[socket.id] = name;
    socket.brodcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.brodcast.emit("receive", {
      message: message,
      name: user[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.brodcast.emit("left", user[socket.id]);
    delete users[socket.id];
  });
});
