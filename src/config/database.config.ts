import { DynamicModule, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const entitiesList = [__dirname + '/../**/*.entity{.ts,.js}'];

/**
 * Handle Database connection.
 */
export class DBProviderModule {
  static forConnection(): DynamicModule {
    Logger.log('Connecting to DB ' + process.env.DB_HOST);
    return TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: 'dev',
      // username: process.env.DB_USER,
      // password: process.env.DB_PASS,
      entities: entitiesList,
      keepConnectionAlive: true,
      synchronize: true,
      ssl: false,
      extra: {
        connectionLimit: 10 /* connection pooling */,
      },
    });
  }
}
