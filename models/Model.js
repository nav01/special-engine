export default class Model {
    //expects json object retrieved from inventory server
    constructor(model) {
        this.id = model['id'];
        this.name = model['name'];
    }
}