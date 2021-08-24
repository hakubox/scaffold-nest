import { Connection, Repository } from 'typeorm';
import { Cat } from '../../entities/cat.entity';

export const catProviders = [
  {
    provide: 'cat_repository',
    useFactory: (connection: Connection) => connection.getRepository(Cat),
    inject: ['DATABASE_CONNECTION'],
  },
];