import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import AppController from './app.controller';
import AppService from './app.service';
import V1Module from '../v1/v1.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL as string, {
      // useCreateIndex: true,
      // flag to allow users to fall back to the old
      // parser if they find a bug in the new parse
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    RedisModule.forRoot({
      closeClient: true,
      config: {
        url: process.env.REDIS_URL,
        onClientCreated: async (client): Promise<void> => {
          client.on('error', console.error);
          client.on('ready', () => {
            console.log('redis is running on 6379 port');
          });
          client.on('restart', () => {
            console.log('attempt to restart the redis server');
          });
        },
        reconnectOnError: (): boolean => true,

        // host: '127.0.0.1',
        // port: 6380,
        // password: 'masterpassword1',
      },
    }),
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
