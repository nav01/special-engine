import Targetable from "./Targetable";

export default class User extends Targetable {
    //expects user json object retrieved from inventory server
    constructor(user) {
        super('user');
        this.id = user['id'];
        this.name = user['name'];
        this.employeeNumber = user['employee_number'];
        this.username = user['username'];
        this.assetsCount = user['assets_count'];
        this.notes = user['notes'];
        
        if (user['department'] != null && user['location'] != null) {
            this.site = `${user.department.name}-${user.location.name}`;
        } else if (user['department'] != null && user['location'] == null) {
            this.site = user['department']['name'];
        } else if (user['location'] != null && user['department'] == null) {
            this.site = user['location']['name'];
        } else {
            this.site = '';
        }
        
    }
}