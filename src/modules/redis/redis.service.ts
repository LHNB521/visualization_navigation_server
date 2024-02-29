import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor(private configService: ConfigService) {
    this.redisClient = new Redis({
      host: this.configService.get('REDIS_HOST'), // Redis 服务器的端口
      port: this.configService.get('REDIS_PORT'), // Redis 服务器的主机名
      password: this.configService.get('REDIS_PASSWORD'),
    });
  }

  setValue(key: string, value: string, time: number = 2 * 60 * 60 * 24) {
    return this.redisClient.setex(key, time, value);
  }

  getValue(key: string) {
    console.log(key);
    return this.redisClient.get(key);
  }

  setWithExpiry(key: string, value: string, time: number) {
    return this.redisClient.setex(key, time, value);
  }

  async getAllKeys(pattern: string) {
    const keys = await this.redisClient.keys(pattern);
    console.log(keys);
    return keys;
  }

  delValue(key: string) {
    return this.redisClient.del(key);
  }

  async setHashField(key: string, field: string, value: string) {
    return this.redisClient.hset(key, field, value);
  }

  getHashField(key: string, field: string) {
    return this.redisClient.hget(key, field);
  }

  getAllHashFields(key: string) {
    return this.redisClient.hgetall(key);
  }
}
