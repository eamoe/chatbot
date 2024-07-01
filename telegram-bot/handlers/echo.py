from telegram import Update
from telegram.ext import ContextTypes, MessageHandler, filters


async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(chat_id=update.effective_chat.id, text=update.message.text)

echo_handler = MessageHandler(filters=filters.TEXT & (~filters.COMMAND), callback=echo)
