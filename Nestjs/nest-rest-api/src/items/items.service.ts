import { Injectable } from '@nestjs/common';
import { Item } from "./interfaces/item.interfaces"
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose"
import { itemSchema } from './schema/item.schema';

@Injectable()
export class ItemsService {
    constructor(@InjectModel("Items") private readonly itemModel: Model<Item>){}

    findAll():Promise<Item[]>{
       return this.itemModel.find()     
    }

    findOne(id:string):Promise<Item> {
        return this.itemModel.findOne({_id: id})
    }

    update(id:string, body:Item):Promise<Item>{
        return this.itemModel.findOneAndUpdate(id,{body})
    }

    delete(id:string):Promise<Item>{
        return this.itemModel.delete({_id: id})
    }

    create(body:Item):Promise<Item>{
        console.log(body)
        const novo = new itemSchema(body)
        let resp;
        novo.save()
        .then((s) => resp = s)
        return resp;
    }
}










 // private readonly items: Item[] = [
    //     {
    //         id:"123654",
    //         name:"Gustavo",
    //         qty:1569
    //     },
    //     {
    //         id:"asdsa654",
    //         name:"asdsadsad",
    //         qty:14
    //     }
    // ];