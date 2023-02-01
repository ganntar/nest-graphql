import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { ID } from '@nestjs/graphql';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async findAllUsers(): Promise<User[]>{
        const users = await this.userRepository.find();
        return users;
    }

    async findOneUser(id: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {id}});

        if(!user){
            throw new NotFoundException('Usuario não encontrado');    
        }
        return user;
    }

    async createUser(data: CreateUserInput): Promise<User> {
        const user = await this.userRepository.create(data);
        const userSaved = await this.userRepository.save(user);

        if(!userSaved){
            throw new InternalServerErrorException('Problema ao criar um usuário.')
        }

        return userSaved;
    }

    async updateUser(id: string, data: UpdateUserInput): Promise<User> {
        const user = await this.findOneUser(id);
        if(!user){
            throw new NotFoundException('Id invalido');
        }
        await this.userRepository.update(user, { ...data});
        const userUpdated = this.userRepository.create({...user, ...data});

        return userUpdated;
        
    }

    async deleteUser(id: string): Promise<boolean> {
        const user = await this.findOneUser(id);
        if(!user){
            throw new NotFoundException('Id invalido');
        }
        const deleted = await this.userRepository.delete(user);

        return deleted ? true : false;

    }
}
