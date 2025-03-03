import { RpcException } from "@nestjs/microservices";

export const catchErrException = (err: string | object) => {
 throw new RpcException(err);
}