module.exports = (io) => {

  io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    // Join organization room
    socket.on("join-org", (organizationId) => {
      socket.join(organizationId);

      io.to(organizationId).emit(
        "user:online",
        { userId: socket.id }
      );
    });

    // Poll events will be emitted from controllers, not here

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });

};