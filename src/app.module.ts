import { AutomapperModule } from 'nestjsx-automapper';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { WinstonModule } from 'nest-winston';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ContributorModule } from './contributor/contributor.module';
import { SubContributorModule } from './sub-contributor/sub-contributor.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['dist/core/entities/*.js'],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

      cli: {
        migrationsDir: 'src/migration',
      },

      //ssl: false,
      ssl: { rejectUnauthorized: false },
      logging: true,
      synchronize: true,
    }),
    WinstonModule.forRoot({}),
    AutomapperModule.withMapper(),
    ProductModule,
    OrderModule,
    CartModule,
    CategoryModule,
    RefreshTokenModule,
    CloudinaryModule,
    ContributorModule,
    SubContributorModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
