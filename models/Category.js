export default class Category {
    //expects json object retrieved from inventory server
    constructor(category) {
        this.id = category['id'];
        this.name = category['name'];
    }
}