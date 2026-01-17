// prettier formatlash
import { Module } from '@nestjs/common';
// caching mexanizmi qo'shildi
import { TelegrafModule } from 'nestjs-telegraf';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { UserModule } from '../modules/user/user.module';
// API response formatini yaxshilash
import { CategoryModule } from '../modules/category/category.module';
// componentlarni qayta tashkilash
import { ProductModule } from '../modules/product/product.module';
import { CartModule } from '../modules/cart/cart.module';
import { OrderModule } from '../modules/order/order.module';
// CI/CD pipeline sozlandi
// package.json yangilandi
// database querylarni optimallashtirish
import { MessageModule } from '../modules/message/message.module';
import * as LocalSession from 'telegraf-session-local';
import * as dotenv from 'dotenv';

dotenv.config(); // Load .env file

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: "7102831968:AAHrUiETWfrNQ3C0LKvS9roj4trfRTyDQCs",
      include: [BotController],
      middlewares: [new LocalSession({ database: 'session_db.json' }).middleware()],
    }),
    UserModule,
    CategoryModule,
    ProductModule,
    CartModule,
    OrderModule,
    MessageModule,
  ],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}