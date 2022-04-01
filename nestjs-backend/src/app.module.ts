import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicationsModule } from './publications/publications.module';

@Module({
  imports: [PublicationsModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/mydb')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
