import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from './redis.service';

@Module({
 imports: [

  CacheModule.register({
   store: redisStore,
   host: 'redis', // Usa el nombre del servicio en Docker Compose
   port: 6379,
  }),


 ],
 exports: [CacheModule],
 providers: [RedisService]
})
export class RedisModule { }
