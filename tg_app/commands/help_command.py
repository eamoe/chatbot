from telegram import Update
from telegram.ext import ContextTypes, CommandHandler


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(chat_id=update.effective_chat.id,
                                   text="/addword [word] [definition] - Add a new word\n"
                                        "/showwords - Show all your words\n"
                                        "/removeword [word] - Remove a word\n"
                                        "/quiz - Start a quiz\n"
                                        "/translate [word] [language] - Translate a word\n"
                                        "/examples [word] - Show example sentences\n"
                                        "/synonyms [word] - Show synonyms\n"
                                        "/randomword - Show a random word\n"
                                        "/review [interval] - Set review interval\n"
                                        "/import [file] - Import words from a file\n"
                                        "/export - Export your words\n"
                                        "/progress - Show your progress\n"
                                        "/settings - Configure your preferences\n"
                                        "/feedback - Provide feedback")

help_handler = CommandHandler(command='help', callback=help_command)
