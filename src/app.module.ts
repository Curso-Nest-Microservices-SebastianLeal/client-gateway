import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
// import { RedisModule } from './redis/redis.module';
import { NatsModule } from './transports/nats.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
   // RedisModule,
    ProductsModule,
    OrdersModule,
    NatsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
