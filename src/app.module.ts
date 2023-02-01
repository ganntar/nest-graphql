import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { GraphQLModule} from '@nestjs/graphql'
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "ganntar",
        "password": "a265941",
        "database": "nestgraphql",
        "entities": ["dist/**/*.entity{.ts,.js}"],
        "synchronize": true
      }
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gpl'),
    }),
    UserModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
