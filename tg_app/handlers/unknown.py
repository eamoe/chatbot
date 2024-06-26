from telegram import Update
from telegram.ext import ContextTypes, MessageHandler, filters


async def unknown(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(chat_id=update.effective_chat.id, text="Sorry, I didn't understand that command.")

unknown_handler = MessageHandler(filters.COMMAND, unknown)
