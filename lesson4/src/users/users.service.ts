import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
// postgresql://neondb_owner:npg_mg0VHjpRqoX7@ep-shiny-term-a5ijnvfp-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
// postgresql://neondb_owner:npg_mg0VHjpRqoX7@ep-shiny-term-a5ijnvfp-pooler.us-east-2.aws.neon.tech/thesalespot-backend-db?sslmode=require
@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Alice Johnson', role: 'ADMIN', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', role: 'USER', email: 'bob@example.com' },
    {
      id: 3,
      name: 'Charlie Brown',
      role: 'INTERN',
      email: 'charlie@example.com',
    },
    {
      id: 4,
      name: 'David Williams',
      role: 'ADMIN',
      email: 'david@example.com',
    },
    { id: 5, name: 'Emma Watson', role: 'USER', email: 'emma@example.com' },
    { id: 6, name: 'Frank Miller', role: 'INTERN', email: 'frank@example.com' },
  ];

  findAll(role?: 'ADMIN' | 'USER' | 'INTERN') {
    if (role) {
      const rolesArray = this.users.filter((x) => x.role === role);
      if (rolesArray.length <= 0) {
        throw new NotFoundException('role Not Found!');
      }
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((x) => x.id == id);
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    return user;
  }
  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) =>
      user.id === id ? { ...user, ...updateUserDto } : user,
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
