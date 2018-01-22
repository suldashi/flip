class Channel {
    constructor(name) {
        this.name = name;
        this.status = "idle";
        this.participants = 0;
    }
}

module.exports = Channel;