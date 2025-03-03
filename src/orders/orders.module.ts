import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_SERVICE } from 'src/config';
import { RedisModule } from 'src/redis/redis.module';
import { OrdersService } from './orders.service';
import { RedisService } from 'src/redis/redis.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, RedisService],
  imports: [
    CacheModule.register(), // 💡 Se importa el módulo de caché
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMicroserviceHost,
          port: envs.ordersMicroservicePort
        }
      }
    ]),
    RedisModule
  ]
})
export class OrdersModule { }
