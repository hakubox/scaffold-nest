import { Module } from '@nestjs/common';
import { CatModule } from './module/cat/cat.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      typePaths: ['./**/*.gql'],
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    CatModule,
  ],
})
export class AppModule {}
