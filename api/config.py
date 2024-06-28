import os

# EUTODO: implement python-decouple package
DB_URL = os.getenv('DB_URL')
DB_NAME = os.getenv('DB_NAME', 'dictionary')
COLLECTION_NAME = os.getenv('COLLECTION_NAME', 'vocabulary')
