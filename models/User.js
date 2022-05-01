import Targetable from "./Targetable";

export default class User extends Targetable {
    //expects user json object retrieved from inventory server
    constructor(user) {
        super('user');
        this.id = user['id'];
        this.name = user['name'];
        this.employeeNumber = user['employee_number'];
    }
}