import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { Publication, PublicationDocument, } from 'src/schemas/publication.schema';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationsService {
  constructor(@InjectModel(Publication.name) private publicationModel: Model<PublicationDocument>) {}

  async create(createPublicationDto: CreatePublicationDto): Promise<Publication> {
    return new this.publicationModel(createPublicationDto).save();
  }

  async findAll() {
    return this.publicationModel.find();
  }

 async findOne(id: string) {
    return this.publicationModel.findOne({_id: id});
  }

 async update(id: string , updatePublicationDto: UpdatePublicationDto) {

   var query = {'_id': id};
    const update = await this.publicationModel.findByIdAndUpdate(query, updatePublicationDto,{upsert: true});
    if(update){
      return new HttpException('Publication Successfully Updated!',HttpStatus.CREATED);
    }
  }

  async remove(id: string) {
   const remove =  await this.publicationModel.deleteOne({_id: id});
   if(remove){
    return new HttpException('Publication Successfully Deleted!',HttpStatus.FOUND);
   }
  }
}
