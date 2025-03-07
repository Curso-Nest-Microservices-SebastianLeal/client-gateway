import { Logger, Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { envs } from 'src/config';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    NatsModule
  ]
})

export class ProductsModule {

  constructor() {
    const logger = new Logger();
    logger.log('envs', envs)
  }
}
