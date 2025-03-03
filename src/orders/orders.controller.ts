import { Controller, Get, Post, Body, Patch, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) { }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {

    return await this.ordersService.createOrder(createOrderDto);

  }

  @Get()
  async findAllOrders(@Query() orderPaginationDto: OrderPaginationDto) {

    return await this.ordersService.findAllOrders(orderPaginationDto);

  }

  @Get('id/:id')
  async findOneOrder(@Param('id', ParseUUIDPipe) id: string) {

    return await this.ordersService.findOneOrder(id);

  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {

    return await this.ordersService.findAllByStatus(statusDto, paginationDto);

  }

  @Patch(':id')
  async changeOrderStatus(@Param('id', ParseUUIDPipe) id: string, @Body() statusDto: StatusDto) {

    return await this.ordersService.changeOrderStatus(id, statusDto);

  }
}
