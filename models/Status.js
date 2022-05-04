class Status {
    //expects json object retrieved from inventory server
    constructor(status) {
        this.id = status['id'];
        this.name = status['name'];
        this.type = status['type'];
    }
}

class StatusMeta extends Status {
    //expects json object retrieved from inventory server
    constructor(status, meta) {
        super(status);
        this.meta = meta;
    }
}

module.exports = {Status: Status, StatusMeta: StatusMeta};