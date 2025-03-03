import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ORDER_SERVICE } from "src/config";
import { CreateOrderDto, OrderPaginationDto, StatusDto } from "./dto";
import { catchError, firstValueFrom } from "rxjs";
import { catchErrException } from "src/utils/utils";
import { PaginationDto } from "src/common";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class OrdersService {

 constructor(
  @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  private readonly redisService: RedisService,
 ) { }

 async createOrder(createOrderDto: CreateOrderDto) {

  try {

   const newOrder = await firstValueFrom(
    this.ordersClient.send({ cmd: 'create_order' }, createOrderDto)
   );

   await this.redisService.deleteCache('orders:all');

   return newOrder;
  } catch (err) {
   throw err;
  }
 }

 async findAllOrders(orderPaginationDto: OrderPaginationDto) {

  try {
   const cacheKey = 'orders:all';
   const cachedOrders = await this.redisService.get(cacheKey);

   if (cachedOrders) {
    return cachedOrders;
   }

   const orders = await firstValueFrom(
    this.ordersClient.send('findAllOrders', orderPaginationDto)
   );

   await this.redisService.set(cacheKey, orders); // Guardamos en caché por 300 segundos
   return orders;

  } catch (err) {
   throw err;
  }
 }

 async findOneOrder(id: string) {

  try {
   const cacheKey = `orders:${id}`;
   const cachedOrder = await this.redisService.get(cacheKey);

   if (cachedOrder) {
    return cachedOrder;
   }

   const order = await firstValueFrom(
    this.ordersClient.send('findOneOrder', { id })
   );

   await this.redisService.set(cacheKey, order, 300);
   return order;

  } catch (err) {
   throw err;
  }
 }

 async findAllByStatus(statusDto: StatusDto, paginationDto: PaginationDto) {

  try {

   return firstValueFrom(
    this.ordersClient.send('findAllOrders', {
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
    this.ordersClient.send('changeOrderStatus', { id, status: statusDto.status })
   )

   await this.redisService.deleteCache(['orders:all', `orders:${id}`]);

   return order;

  } catch (err) {
   throw err;
  }
 }
}