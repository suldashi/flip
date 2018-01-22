const Channel = require("./channel");

class ChannelService {
    constructor() {
        this.channels = {};
    }

    getOrCreateChannel(channelName) {
        if(!this.channels[channelName]) {
            this.channels[channelName] = new Channel(channelName);
        }
        return this.channels[channelName];
    }
}

module.exports = new ChannelService();