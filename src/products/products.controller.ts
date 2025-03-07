import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { CreateProductDto } from 'src/common/dtos/create-product.dto';
import { UpdateProductDto } from 'src/common/dtos/update-product.dto';
import { NATS_SERVICE } from 'src/config';
import { catchErrException } from 'src/utils/utils';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {

    return this.client.send({ cmd: 'create_product' }, createProductDto)
      .pipe(catchError((err) => { throw catchErrException(err) }));
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {

    return this.client.send({ cmd: 'find_all_products' }, paginationDto)
      .pipe(catchError((err) => { throw catchErrException(err) }))
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {

    return this.client.send({ cmd: 'find_one_product' }, id)
      .pipe(catchError((err) => { throw catchErrException(err) }));
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {

    return this.client.send({ cmd: 'delete_product' }, id)
      .pipe(catchError((err) => { throw catchErrException(err) }));

  }

  @Patch(':id')
  patchProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto) {

    return this.client.send({ cmd: 'update_product' }, {
      id,
      ...updateProductDto
    }).pipe(catchError((err) => { throw catchErrException(err) }));
  }
}