import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: "Alice Johnson", role: "ADMIN", email: "alice@example.com" },
        { id: 2, name: "Bob Smith", role: "USER", email: "bob@example.com" },
        { id: 3, name: "Charlie Brown", role: "INTERN", email: "charlie@example.com" },
        { id: 4, name: "David Williams", role: "ADMIN", email: "david@example.com" },
        { id: 5, name: "Emma Watson", role: "USER", email: "emma@example.com" },
        { id: 6, name: "Frank Miller", role: "INTERN", email: "frank@example.com" }
      ];

      findAll(role?:"ADMIN"|"USER"|"INTERN"){
        if(role){
            return this.users.filter(x=>x.role === role)
        }
        return this.users;
      }

      findOne(id:number){
        const user = this.users.find(x=>x.id==id)
        return user
      }
      create(user:{name:string,email:string,role:"ADMIN"|"USER"|"INTERN"}){
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
      }

      update(id: number, updateUser: { name?: string; email?: string; role?: "ADMIN" | "USER" | "INTERN" }) {
        this.users = this.users.map((user) => 
          user.id === id ? { ...user, ...updateUser } : user
        );
        return this.findOne(id);
      }      
      delete(id: number) {
        const removeUser = this.findOne(id);
        if (!removeUser) return null; 
        this.users = this.users.filter((user) => user.id !== id);   
        return removeUser;
      }
      
}
