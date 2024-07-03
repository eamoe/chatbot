from telegram import Update
from telegram.ext import ContextTypes, CommandHandler


async def caps(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text_caps = ' '.join(context.args).upper()
    await context.bot.send_message(chat_id=update.effective_chat.id, text=text_caps)

caps_handler = CommandHandler(command='caps', callback=caps)
