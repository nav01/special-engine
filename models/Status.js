class Status {
    constructor(status) {
        this.id = status['id'];
        this.name = status['name'];
        this.type = status['type'];
    }
}

class StatusMeta extends Status {
    constructor(status, meta) {
        super(status);
        this.meta = meta;
    }
}

module.exports = {Status: Status, StatusMeta: StatusMeta};