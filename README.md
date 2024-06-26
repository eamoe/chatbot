# Tresaurus Telegram Bot

## Project Description

**Tresaurus** is a chatbot that helps to memorize new vocabulary.

Here is a list of commands it understands:

1. `/start`: Initialize the bot and provide a welcome message with instructions on how to use the bot.
2. `/help`: Provide a list of available commands and their descriptions.
3. `/addword [word] [definition]`: Allow users to add new words along with their definitions to their personal vocabulary list.
4. `/showwords`: Display the list of all words and their definitions that the user has added.
5. `/removeword [word]`: Remove a word from the user's vocabulary list.
6. `/quiz`: Start a vocabulary quiz, where the bot randomly picks a word and asks the user for its definition or vice versa.
7. `/translate [word] [language]`: Translate a given word into a specified language using an external API (like Google Translate API).
8. `/examples [word]`: Provide example sentences using the given word to help understand its usage.
9. `/synonyms [word]`: Provide synonyms for a given word.
10. `/randomword`: Show a random word from the user's vocabulary list to encourage regular revision.
11. `/review [interval]`: Set a review interval (daily, weekly) to get periodic reminders to review vocabulary.
12. `/import [file]`: Allow users to import a list of words from a file (e.g., CSV format).
13. `/export`: Allow users to export their vocabulary list to a file.
14. `/progress`: Track and display the user's progress, including words learned, quizzes taken, and success rates.
15. `/settings`: Configure user preferences such as preferred quiz type, notification settings, etc.
16. `/feedback`: Provide a way for users to give feedback about the bot or report issues.

## Project Structure

The project structure is as follows:

```
tg_app/
│
├── main.py                 # Main application
├── config.py               # Configuration settings
├── bot.py                  # Entry point of the bot
│
├── commands/               # Directory for command handlers
│   ├── __init__.py
│   ├── start.py            # Handler for the /start command
│   ├── command1.py
│
├── handlers/               # Directory for message/callback/query handlers
│   ├── __init__.py
│   ├── message_handler.py  # General message handler
│   ├── callback_handler.py # Callback query handler
│
├── utils/                  # Utility functions
│   ├── __init__.py
│   ├── database.py         # Database connection and operations
│   ├── helpers.py          # Helper functions
│
├── models/                 # Database models
│   ├── __init__.py
│   ├── user.py             # User model
│
├── logs/                   # Log files
│   ├── bot.log             # Log file for the bot
│
└── requirements.txt
```

## Documentation Links

The `update` object contains all the information and data that are coming from Telegram itself (the message, the user who issued the command, etc.).

The `context` object contains information and data about the status of the library itself (like the Bot, the Application, the job_queue, etc.).

[Home page](https://github.com/python-telegram-bot/python-telegram-bot/wiki)

[Examples](https://github.com/python-telegram-bot/python-telegram-bot/tree/51ef571a0761bbfea136c455bbfa67d47b20585c/examples)

[ApplicationBuilder](https://docs.python-telegram-bot.org/en/stable/telegram.ext.applicationbuilder.html#telegram-ext-applicationbuilder) is a class that serves as initializer for `telegram.ext.Application`.

[Application](https://docs.python-telegram-bot.org/en/stable/telegram.ext.application.html#telegram.ext.Application) is a class that dispatches all kinds of updates to its registered handlers, and is the entry point to a PTB application.

[filters Module](https://docs.python-telegram-bot.org/en/stable/telegram.ext.filters.html) contains filters for use with `telegram.ext.MessageHandler`, `telegram.ext.CommandHandler`, or `telegram.ext.PrefixHandler`.

Filter examples are [here](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Extensions---Advanced-Filters).

[Inline Bots](https://core.telegram.org/bots/inline)

[InlineQueryHandler](https://docs.python-telegram-bot.org/en/stable/telegram.ext.inlinequeryhandler.html) is a class to handle Telegram updates that contain a `telegram.Update.inline_query`.

You can use handler groups to organize handlers.

[Frequently requested design patterns](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Frequently-requested-design-patterns#how-to-handle-updates-in-several-handlers)

[Exceptions, Warnings, and Logging](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Exceptions%2C-Warnings-and-Logging)

## Useful Commands

```console
docker compose -f docker-compose.yml down
 docker compose -f docker-compose.yml build --no-cache && docker compose -f docker-compose.yml up -d
```
