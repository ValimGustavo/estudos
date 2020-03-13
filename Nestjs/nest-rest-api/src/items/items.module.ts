import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { itemSchema } from './schema/item.schema';



@Module({
  imports: [MongooseModule.forFeature([{name:"Items", schema:itemSchema}])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
