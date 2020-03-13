import { Controller, Get, Post, Put, Delete, Body, Param} from '@nestjs/common';
import { createItemDTO } from './dto/create-item.dto';
import { ItemsService } from './items.service'
import { Item } from "./interfaces/item.interfaces"



@Controller('items')            //caminho da url. [URLbase]/items
export class ItemsController {
    constructor(private readonly itemService: ItemsService){}

    @Get()                      //decorador metodo get. Caso seja passado uma string dentro da funcao, ele concatena criando /path/[caminho passado por paramentro]
    findAll():Promise<Item[]>{
         return this.itemService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id):Promise<Item>{
        return this.itemService.findOne(id);
    }

    @Post("create")                                 
    createItem(@Body() item:createItemDTO):Promise<Item>{
        return this.itemService.create(item);
    }

    @Put(":id")                      
    updateItem(@Body() body:createItemDTO, @Param('id') id):string{
        return `id:${id}  body:${body.name}`;
    }

    @Delete(':id')
    deleteItem(@Param("id") id):string{
        return "delete "+id;
    }
}
