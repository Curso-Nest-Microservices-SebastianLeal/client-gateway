import { Controller, Get, Post, Body, Patch, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';
import { OrdersService } from './orders.service';
import { RpcException } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) { }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await this.ordersService.createOrder(createOrderDto);
      return order;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Get()
  async findAllOrders(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      const orders = await this.ordersService.findAllOrders(orderPaginationDto);
      return orders;
    } catch (err) {
      throw new RpcException(err)
    }
  }

  @Get('id/:id')
  async findOneOrder(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await this.ordersService.findOneOrder(id);
      return order;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {
    try {
      const orders = await this.ordersService.findAllByStatus(statusDto, paginationDto);
      return orders;
    } catch (err) {
      throw new RpcException(err);
    }
  }

  @Patch(':id')
  async changeOrderStatus(@Param('id', ParseUUIDPipe) id: string, @Body() statusDto: StatusDto) {
    try {
      const order = await this.ordersService.changeOrderStatus(id, statusDto);
      return order;
    } catch (err) {
      throw new RpcException(err)
    }
  }
}
