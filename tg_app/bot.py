from telegram.ext import ApplicationBuilder

from commands.start import start_handler
from commands.help_command import help_handler
from commands.caps import caps_handler

from handlers.echo import echo_handler
from handlers.inline_caps import inline_caps_handler
from handlers.unknown import unknown_handler


def start_bot(bot_token):

    application = ApplicationBuilder().token(bot_token).build()

    application.add_handler(start_handler)
    application.add_handler(help_handler)
    application.add_handler(echo_handler)
    application.add_handler(caps_handler)
    application.add_handler(inline_caps_handler)
    application.add_handler(unknown_handler)

    application.run_polling()
