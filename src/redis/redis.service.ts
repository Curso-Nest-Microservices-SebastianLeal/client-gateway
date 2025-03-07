import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
 private readonly logger = new Logger(RedisService.name);

 constructor(
  @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
 ) { }

 async set(key: string, value: any, ttl?: number) {

  try {
   await this.cacheManager.set(key, value, ttl);
   this.logger.log(`Guardado en caché: ${key}`);
  } catch (error) {
   this.logger.error(`Error guardando en caché: ${error.message}`);
  }

 }

 async get(key: string): Promise<any> {
  try {

   const data = await this.cacheManager.get(key);
   this.logger.log(`Obteniendo de caché: ${key} -> ${data}`);
   return data;

  } catch (error) {

   this.logger.error(`Error obteniendo de caché: ${error.message}`);
   return null;

  }
 }

 async deleteCache(keys: string | string[]) {
  try {
   if (Array.isArray(keys)) {

    await Promise.all(keys.map((key: string) => this.cacheManager.del(key)));
    this.logger.log(`Eliminadas claves de caché: ${keys.join(', ')}`);

   } else {

    await this.cacheManager.del(keys);
    this.logger.log(`Eliminada clave de caché: ${keys}`);

   }
  } catch (error) {
   this.logger.error(`Error eliminando de caché: ${error.message}`);
  }
 }
}