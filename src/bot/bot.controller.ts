import { Controller } from '@nestjs/common';
import { Hears, On, Start, Update, Command, Action, Ctx } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import * as i18n from 'i18n';
import { BotService } from './bot.service';

interface SessionData {
// component testlari yaratildi
// installation qo'llanmasi yaratildi
  phone?: string;
  address?: string;
  deliveryType?: string;
}

interface CustomContext extends Context {
  session: SessionData;
  match?: RegExpExecArray;
}

@Controller()
@Update()
export class BotController {
  constructor(private botService: BotService) {}

  @Start()
  async start(@Ctx() ctx: CustomContext) {
    const user = await this.botService.getUser(ctx.from.id.toString());
    if (!user) {
      await ctx.reply(i18n.__('welcome'), {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🇺🇿 O‘zbek', callback_data: 'lang_uz' }],
            [{ text: '🇷🇺 Русский', callback_data: 'lang_ru' }],
            [{ text: '🇬🇧 English', callback_data: 'lang_en' }],
          ],
        },
      });
    } else {
      i18n.setLocale(user.language);
      await ctx.reply(i18n.__('welcome'), {
        reply_markup: {
          keyboard: [
            [{ text: i18n.__('products') }, { text: i18n.__('cart') }],
            [{ text: i18n.__('orders') }, { text: i18n.__('support') }],
            [{ text: i18n.__('change_language') }],
          ],
          resize_keyboard: true,
        },
      });
    }
  }

  @Action(/^lang_(.+)$/)
  async setLanguage(@Ctx() ctx: CustomContext) {
    const lang = ctx.match ? ctx.match[1] : 'uz';
    let user = await this.botService.getUser(ctx.from.id.toString());
    if (!user) {
      user = await this.botService.createUser(ctx.from.id.toString(), ctx.from.first_name, lang);
    } else {
      user = await this.botService.updateLanguage(ctx.from.id.toString(), lang);
    }
    i18n.setLocale(lang);
    await ctx.reply(i18n.__('welcome'), {
      reply_markup: {
        keyboard: [
          [{ text: i18n.__('products') }, { text: i18n.__('cart') }],
          [{ text: i18n.__('orders') }, { text: i18n.__('support') }],
          [{ text: i18n.__('change_language') }],
        ],
        resize_keyboard: true,
      },
    });
  }

  @Hears(/🌐 Tilni o‘zgartirish|🇷🇺 Сменить язык|🇬🇧 Change Language/)
  async changeLanguage(@Ctx() ctx: CustomContext) {
    await ctx.reply(i18n.__('select_language'), {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🇺🇿 O‘zbek', callback_data: 'lang_uz' }],
          [{ text: '🇷🇺 Русский', callback_data: 'lang_ru' }],
          [{ text: '🇬🇧 English', callback_data: 'lang_en' }],
        ],
      },
    });
  }

  @Hears(/📦 Mahsulotlar|🇷🇺 Товары|🇬🇧 Products/)
  async showCategories(@Ctx() ctx: CustomContext) {
    const user = await this.botService.getUser(ctx.from.id.toString());
    i18n.setLocale(user.language);
    const categories = await this.botService.getCategories();
    const buttons = categories.map((cat) => [
      {
        text: cat[`name${user.language.charAt(0).toUpperCase() + user.language.slice(1)}`],
        callback_data: `category_${cat.id}`,
      },
    ]);
    await ctx.reply('Kategoriyalar:', {
      reply_markup: {
        inline_keyboard: buttons,
      },
    });
  }

  @Action(/^category_(\d+)$/)
  async showProducts(@Ctx() ctx: CustomContext) {
    const categoryId = ctx.match ? parseInt(ctx.match[1]) : 0;
    if (!categoryId) {
      await ctx.reply('Kategoriya topilmadi.');
      return;
    }
    const user = await this.botService.getUser(ctx.from.id.toString());
    i18n.setLocale(user.language);
    const products = await this.botService.getProducts(categoryId);
    let message = 'Mahsulotlar:\n';
    products.forEach((product, index) => {
      message +=
        `${index + 1}. ${product[`name${user.language.charAt(0).toUpperCase() + user.language.slice(1)}`]} - ${
          product.price
        } UZS\n` +
        `Tavsif: ${product[`description${user.language.charAt(0).toUpperCase() + user.language.slice(1)}`]}\n` +
        `Savatga qo‘shish: /add_${product.id}\n\n`;
    });
    await ctx.reply(message);
  }

  @Command(/^add_(\d+)$/)
  async addToCart(@Ctx() ctx: CustomContext) {
    const productId = ctx.match ? parseInt(ctx.match[1]) : 0;
    if (!productId) {
      await ctx.reply('Mahsulot topilmadi.');
      return;
    }
    const user = await this.botService.getUser(ctx.from.id.toString());
    i18n.setLocale(user.language);
    await this.botService.addToCart(user.id, productId, 1);
    await ctx.reply(i18n.__('add_to_cart'));
  }

  @Hears(/🛒 Savat|🇷🇺 Корзина|🇬🇧 Cart/)
  async showCart(@Ctx() ctx: CustomContext) {
    const user = await this.botService.getUser(ctx.from.id.toString());
    i18n.setLocale(user.language);
    const cart = await this.botService.getCart(user.id);
    if (!cart.length) {
      return ctx.reply(i18n.__('cart_empty'));
    }
    let message = 'Savat:\n';
    cart.forEach((item, index) => {
      message +=
        `${index + 1}. ${item.product.nameUz} - ${item.quantity} dona - ${item.product.price * item.quantity} UZS\n` +
        `O‘chirish: /remove_${item.product.id}\n`;
    });
    message += '\nBuyurtma berish: /place_order';
    await ctx.reply(message);
  }

  @Command(/^remove_(\d+)$/)
  async removeFromCart(@Ctx() ctx: CustomContext) {
    const productId = ctx.match ? parseInt(ctx.match[1]) : 0;
    if (!productId) {
      await ctx.reply('Mahsulot topilmadi.');
      return;
    }
    const user = await this.botService.getUser(ctx.from.id.toString());
    i18n.setLocale(user.language);
    await this.botService.removeFromCart(user.id, productId);
    await ctx.reply(i18n.__('remove_from_cart'));
  }

  @Command('place_order')
  async placeOrder(@Ctx() ctx: CustomContext) {
    const user = await this.botService.getUser(ctx.from.id.toString());
    i18n.setLocale(user.language);
    await ctx.reply(i18n.__('phone_number'), {
      reply_markup: {
        keyboard: [[{ text: 'Telefon raqam yuborish', request_contact: true }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }

  @On('contact')
  async onContact(@Ctx() ctx: CustomContext) {
    const user = await this.botService.getUser(ctx.from.id.toString());
    i18n.setLocale(user.language);
    const phone = ctx.message && 'contact' in ctx.message ? ctx.message.contact.phone_number : undefined;
    if (!phone) {
      await ctx.reply('Telefon raqami topilmadi.');
      return;
    }
    ctx.session.phone = phone;
    await ctx.reply(i18n.__('address'), {
      reply_markup: {
        keyboard: [[{ text: 'Lokatsiya yuborish', request_location: true }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }

  @On('location')
  async onLocation(@Ctx() ctx: CustomContext) {
    const user = await this.botService.getUser(ctx.from.id.toString());
    i18n.setLocale(user.language);
    const location = ctx.message && 'location' in ctx.message ? ctx.message.location : undefined;
    if (!location) {
      await ctx.reply('Lokatsiya topilmadi.');
      return;
    }
    const address = `Lat: ${location.latitude}, Lon: ${location.longitude}`;
    ctx.session.address = address;
    await ctx.reply(i18n.__('delivery_type'), {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Yetkazib berish', callback_data: 'delivery' }],
          [{ text: 'Olib ketish', callback_data: 'pickup' }],
        ],
      },
    });
  }

  @Action(/^(delivery|pickup)$/)
  async onDeliveryType(@Ctx() ctx: CustomContext) {
    const deliveryType = ctx.match ? ctx.match[1] : 'delivery';
    const user = await this.botService.getUser(ctx.from.id.toString());
    i18n.setLocale(user.language);
    ctx.session.deliveryType = deliveryType;
    await ctx.reply(i18n.__('payment_method'), {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Naqd', callback_data: 'payment_cash' }],
          [{ text: 'Payme', callback_data: 'payment_payme' }],
          [{ text: 'Click', callback_data: 'payment_click' }],
          [{ text: 'Stripe', callback_data: 'payment_stripe' }],
          [{ text: 'Joyida to‘lash', callback_data: 'payment_onspot' }],
        ],
      },
    });
  }

  @Action(/^payment_(.+)$/)
  async onPaymentMethod(@Ctx() ctx: CustomContext) {
    const paymentMethod = ctx.match ? ctx.match[1] : 'cash';
    const user = await this.botService.getUser(ctx.from.id.toString());
    i18n.setLocale(user.language);
    const cart = await this.botService.getCart(user.id);
    for (const item of cart) {
      await this.botService.createOrder(
        user.id,
        item.product.id,
        item.quantity,
        ctx.session.phone,
        ctx.session.address,
        ctx.session.deliveryType,
        paymentMethod,
      );
    }
    await ctx.reply(i18n.__('order_placed'));
    await this.botService.getCart(user.id).then((items) =>
      items.forEach((item) => this.botService.removeFromCart(user.id, item.product.id)),
    );
    ctx.session = {};
  }

  @Hears(/🕒 Buyurtmalar tarixi|🇷🇺 История заказов|🇬🇧 Order History/)
  async showOrders(@Ctx() ctx: CustomContext) {
    const user = await this.botService.getUser(ctx.from.id.toString());
    i18n.setLocale(user.language);
    const orders = await this.botService.getOrders(user.id);
    let message = 'Buyurtmalar:\n';
    orders.forEach((order, index) => {
      message += `${index + 1}. ${order.product.nameUz} - ${order.quantity} dona - ${order.status}\n`;
    });
    await ctx.reply(message);
  }

  @Hears(/💬 Qo‘llab-quvvatlash|🇷🇺 Поддержка|🇬🇧 Support/)
  async supportChat(@Ctx() ctx: CustomContext) {
    const user = await this.botService.getUser(ctx.from.id.toString());
    i18n.setLocale(user.language);
    const messages = await this.botService.getMessages(user.id);
    let message = 'Xabarlar:\n';
    messages.forEach((msg) => {
      message += `${msg.message}\n`;
    });
    await ctx.reply(message);
  }

  @On('text')
  async onMessage(@Ctx() ctx: CustomContext) {
    const user = await this.botService.getUser(ctx.from.id.toString());
    const text = ctx.message && 'text' in ctx.message ? ctx.message.text : undefined;
    if (!text || text.includes('Qo‘llab-quvvatlash') || text.includes('Поддержка') || text.includes('Support')) return;
    i18n.setLocale(user.language);
    await this.botService.sendMessage(user.id, 1, text);
    await ctx.reply('Xabaringiz yuborildi.');
  }
}