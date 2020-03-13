import { Item } from "./interfaces/item.interfaces";
import { Model } from "mongoose";
export declare class ItemsService {
    private readonly itemModel;
    constructor(itemModel: Model<Item>);
    findAll(): Promise<Item[]>;
    findOne(id: string): Promise<Item>;
    update(id: string, body: Item): Promise<Item>;
    delete(id: string): Promise<Item>;
    create(body: Item): Promise<Item>;
}
