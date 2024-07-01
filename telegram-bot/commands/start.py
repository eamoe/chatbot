from telegram import Update
from telegram.ext import ContextTypes, CommandHandler


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(chat_id=update.effective_chat.id,
                                   text="Welcome to the Tresaurus, the Vocabulary Learning Bot!\n\n"
                                        "Use /help to see available commands.")

start_handler = CommandHandler(command='start', callback=start)
