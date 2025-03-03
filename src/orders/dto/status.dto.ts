import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";

export class StatusDto {
 @IsOptional()
 @IsEnum(OrderStatus, { message: `Valid status values are ${OrderStatusList}` })
 status: OrderStatus;
}