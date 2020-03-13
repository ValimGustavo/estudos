import { createItemDTO } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from "./interfaces/item.interfaces";
export declare class ItemsController {
    private readonly itemService;
    constructor(itemService: ItemsService);
    findAll(): Promise<Item[]>;
    findOne(id: any): Promise<Item>;
    createItem(item: createItemDTO): Promise<Item>;
    updateItem(body: createItemDTO, id: any): string;
    deleteItem(id: any): string;
}
