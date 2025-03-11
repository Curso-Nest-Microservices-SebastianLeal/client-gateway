import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateOrderDto, OrderPaginationDto, StatusDto } from "./dto";
import { firstValueFrom } from "rxjs";
import { PaginationDto } from "src/common";
import { RedisService } from "src/redis/redis.service";
import { NATS_SERVICE } from "src/config";

@Injectable()
export class OrdersService {

 constructor(
  @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  private readonly redisService: RedisService,
 ) { }

 async createOrder(createOrderDto: CreateOrderDto) {
  try {
   const newOrder = await firstValueFrom(
    this.client.send('createOrder', createOrderDto)
   );
  // await this.redisService.deleteCache('orders:all');
   return newOrder;
  } catch (err) {
   throw err;
  }
 }

 async findAllOrders(orderPaginationDto: OrderPaginationDto) {
  try {
   // const cacheKey = 'orders:all';
   // const cachedOrders = await this.redisService.get(cacheKey);
   // if (cachedOrders) {
   //  return cachedOrders;
   // }
   const orders = await firstValueFrom(
    this.client.send('findAllOrders', orderPaginationDto)
   );
   // await this.redisService.set(cacheKey, orders);
   return orders;
  } catch (err) {
   throw err;
  }
 }

 async findOneOrder(id: string) {
  try {
   // const cacheKey = `orders:${id}`;
   // const cachedOrder = await this.redisService.get(cacheKey);
   // if (cachedOrder) {
   //  return cachedOrder;
   // }
   const order = await firstValueFrom(
    this.client.send('findOneOrder', { id })
   );
   // await this.redisService.set(cacheKey, order, 300);
   return order;
  } catch (err) {
   throw err;
  }
 }

 async findAllByStatus(statusDto: StatusDto, paginationDto: PaginationDto) {
  try {
   return firstValueFrom(
    this.client.send('findAllOrders', {
     ...paginationDto,
     status: statusDto.status
    })
   );
  } catch (err) {
   throw err;
  }
 }

 async changeOrderStatus(id: string, statusDto: StatusDto) {
  try {
   const order = firstValueFrom(
    this.client.send('changeOrderStatus', { id, status: statusDto.status })
   )
  // await this.redisService.deleteCache(['orders:all', `orders:${id}`]);
   return order;
  } catch (err) {
   throw err;
  }
 }
}