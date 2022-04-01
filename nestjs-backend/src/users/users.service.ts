import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  //Auth Login
  async loginUser(username: string) {
    return this.userModel.findOne({ username: username });
  }
  
  //Create Users
  async create(createUserDto: CreateUserDto): Promise<UserDocument>{
    return new this.userModel(createUserDto).save();
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    return this.userModel.findOne({_id: id}) ;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    var query = {'_id': id};
    const update = await this.userModel.findByIdAndUpdate(query, updateUserDto,{upsert: true});
    if(update){
      return new HttpException('User Successfully Updated!',HttpStatus.CREATED);
    }
  }

  async remove(id: string) {
    const remove =  await this.userModel.deleteOne({_id: id});
    if(remove){
      return new HttpException('User Successfully Deleted!',HttpStatus.FOUND);
     }
  }
}
