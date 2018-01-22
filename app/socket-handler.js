const ChannelService = require("./channel/channel-service");

function socketHandler(io) {
    io.on("connection",(socket) => {
        socket.on("connectToChannel",(data) => {
            let channel = ChannelService.getOrCreateChannel(data.channelName);
            socket.emit(`connectToChannel|${data.channelName}`,channel);
        })
    });
}

module.exports = socketHandler;