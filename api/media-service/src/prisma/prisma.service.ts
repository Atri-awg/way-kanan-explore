import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { Pool, type PoolConfig } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    const poolConfig: PoolConfig = {
      connectionString: databaseUrl,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const pool: Pool = new Pool(poolConfig);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const adapter = new PrismaPg(pool);

    super({
      adapter,
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
