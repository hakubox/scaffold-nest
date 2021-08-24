import { createConnection } from 'typeorm';
import { Cat } from './entities/cat.entity';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      port: 3306,
      // host: '49.235.88.118',
      // username: 'root',
      // password: '9HyZXEiN3XKtdxkm',
      // database: 'cat',
      host: 'localhost',
      username: 'haku',
      password: '123456',
      database: 'cat',
      entities: [
        Cat
      ],
      // entities: [
      //     __dirname + '/../**/*.entity{.ts,.js}',
      // ],
      synchronize: true,
    }),
  },
];