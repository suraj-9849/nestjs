import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */
   @Get()
   findAll(){
    return []
   }

   @Get()
   findQuery(@Query("role") role?:"INTERN"|"ADMIN"|"CEO"){
    return []
   }
   
   @Get("interns")
   findAllInterns(){
    return []
   }

   @Get(":id")
   findOne(@Param("id") id:string){
    return {id}
   }
   
   @Post()
   create(@Body() user:{}){
    return user;
   }
   
   @Patch(":id")
   update(@Param("id") id:string, @Body() userUpdate:{}){
    return {id,...userUpdate}
   }

   @Delete(":id")
   delete(@Param("id") id:string){
    return {id}
   }
}
