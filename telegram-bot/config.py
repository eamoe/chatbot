import os

# EUTODO: Change to python-decouple
BOT_TOKEN = os.getenv('BOT_TOKEN')
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///bot.db')
LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
