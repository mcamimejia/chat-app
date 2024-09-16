import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';
import 'dotenv/config';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            context: ({ req }) => ({ req }),
            subscriptions: {
                'graphql-ws': true,
            },
        }),
        MongooseModule.forRoot(process.env.DATABASE_URL),
        UserModule,
        MessageModule,
        AuthModule,
        RoomModule
    ]
})
export class AppModule {}