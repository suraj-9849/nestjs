import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {

    constructor(private readonly usersService:UsersService){}
    /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */
   @Get()
   findAll(){
    return this.usersService.findAll();
   }

   @Get()
   findQuery(@Query("role") role?:"INTERN"|"ADMIN"|"USER"){
    return this.usersService.findAll(role)
   }

   @Get(":id")
   findOne(@Param("id") id:string){
    return this.usersService.findOne(+id)
   }
   
   @Post()
   create(@Body() user:{name:string,email:string,role:"ADMIN"|"USER"|"INTERN"}){
    return this.usersService.create(user);
   }
   
   @Patch(":id")
   update(@Param("id") id:string, @Body() userUpdate:{name?:string,email?:string,role?:"ADMIN"|"USER"|"INTERN"}){
    return this.usersService.update(+id,userUpdate)
   }

   @Delete(":id")
   delete(@Param("id") id:string){
    return this.usersService.delete(+id)
   }
}
