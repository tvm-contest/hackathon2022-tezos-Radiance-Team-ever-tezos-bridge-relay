import { Controller, Get, Param, Body, Post, Delete, Put } from '@nestjs/common';
import {EverEventDto} from "./dto/everEvent.dto";
import {EverService} from "./everchain.service"
import {updateEverEventDto} from "./dto/updateEverEvent.dto";


@Controller('everchain')
export class EverChainController {
    constructor(private readonly everService: EverService) {
    }
    @Get()
    get(){
        return this.everService.getAll()
    }
    @Get(':id')
    getOne(@Param('id') id: string){
        return this.everService.getOne(id)
    }
    @Post()
    create(@Body() everEvent:EverEventDto){
        return this.everService.create(everEvent)
    }
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.everService.remove(id)

    }
    @Put(':id')
    put(@Body() updateEverEvent: updateEverEventDto, @Param('id') id: string){
        console.log(id,updateEverEvent)
        return this.everService.update(id, updateEverEvent)
    }
}
