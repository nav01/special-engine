import Category from "./Category";
import Model from "./Model";
import {StatusMeta} from "./Status";
import Targetable from "./Targetable";
import User from "./User";

export default class Asset extends Targetable {
    constructor(asset) {
        super('asset');
        this.id = asset['id'];
        this.assetTag = asset['asset_tag'];
        this.serial = asset['serial'];
        this.image = asset['image'];
        this.category = new Category(asset['category']);
        this.model = new Model(asset['model']);
        this.status = new StatusMeta(asset['status_label'], asset['status_label']['status_meta']);

        if(asset['assigned_to'] == null)
            this.user = null;
        else
            this.user = new User(asset['assigned_to']);
    }
}