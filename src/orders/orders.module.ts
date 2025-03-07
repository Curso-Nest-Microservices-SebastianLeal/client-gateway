import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from 'src/config';
import { RedisModule } from 'src/redis/redis.module';
import { OrdersService } from './orders.service';
import { RedisService } from 'src/redis/redis.service';
import { CacheModule } from '@nestjs/cache-manager';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, RedisService],
  imports: [
    CacheModule.register(), // 💡 Se importa el módulo de caché
    NatsModule,
    RedisModule
  ]
})
export class OrdersModule { }
