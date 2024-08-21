import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Diana Prince',
      email: 'diana.prince@example.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'Evan Davis',
      email: 'evan.davis@example.com',
      role: 'ENGINEER',
    },
    {
      id: 6,
      name: 'Fiona White',
      email: 'fiona.white@example.com',
      role: 'INTERN',
    },
    {
      id: 7,
      name: 'George Martin',
      email: 'george.martin@example.com',
      role: 'ENGINEER',
    },
    {
      id: 8,
      name: 'Hannah Lee',
      email: 'hannah.lee@example.com',
      role: 'ADMIN',
    },
    {
      id: 9,
      name: 'Ian Clarke',
      email: 'ian.clarke@example.com',
      role: 'INTERN',
    },
    {
      id: 10,
      name: 'Jasmine Taylor',
      email: 'jasmine.taylor@example.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('User Role Not Found');
      return rolesArray;
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Foun');
    return user;
  }
  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { id: usersByHighestId[0].id + 1, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }
  deleteOne(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
