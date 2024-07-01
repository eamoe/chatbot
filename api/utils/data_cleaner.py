from pymongo import MongoClient
from bson import ObjectId
import logging


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class DataCleaner:

    db_url: str = str()
    db_name: str = str()
    collection_name: str = str()

    client: MongoClient = None

    def __init__(self, db_url, db_name, collection_name):
        self.db_url = db_url
        self.db_name = db_name
        self.collection_name = collection_name

    def open_connection(self):
        self.client = MongoClient(self.db_url)

    def close_connection(self):
        self.client.close()

    def __get_collection(self):
        return self.client[self.db_name][self.collection_name]

    def __get_all_documents(self):
        return self.__get_collection().find()

    def __insert_many_documents(self, documents):
        if documents:
            self.__get_collection().insert_many(documents)
            logger.info(f"Inserted {len(documents)} documents into '{self.collection_name}' collection.")
        else:
            logger.info("No documents found to convert.")

    def __delete_many_documents(self, id_list):
        if id_list:
            self.__get_collection().delete_many({'_id': {'$in': id_list}})
            logger.info(f"Deleted {len(id_list)} documents from '{self.collection_name}' collection.")
        else:
            logger.info("No documents found to delete.")

    def __process_document(self, document):
        if isinstance(document["_id"], ObjectId):
            # Create a copy and replace ObjectId with its string representation
            copied_doc = document.copy()
            copied_doc['_id'] = str(copied_doc['_id'])

            # Do not process a document if another document with the same string ID already exists
            existed_doc = self.__get_collection().find_one({'_id': copied_doc['_id']})
            if existed_doc:
                return None
            else:
                return copied_doc, document["_id"]

    def convert_object_ids_to_strings(self):
        """The method iterates through the collection and creates a copy of each document
        by converting parent's id (ObjectId) to a string representation. Then, it removes the parent document."""

        logger.info("Converting ObjectIds to strings...")

        # The list of converted documents
        converted_docs = []
        # The list of documents that will be deleted after conversion
        ids_to_delete = []

        processed, skipped = 0, 0

        for doc in self.__get_all_documents():
            processed += 1
            result = self.__process_document(doc)
            if result is not None:
                converted_doc, doc_id_to_delete = result
                converted_docs.append(converted_doc)
                ids_to_delete.append(doc_id_to_delete)
            else:
                skipped += 1

            if processed % 10000 == 0:
                logger.info(f"Processed: {processed}")

        logger.info(f"{processed} documents were processed. "
                    f"{skipped} were skipped due to identical ids conflict after conversion.")

        self.__insert_many_documents(converted_docs)
        self.__delete_many_documents(ids_to_delete)

    def delete_filtered_documents(self, custom_filter):
        """The method removes all documents where not all fields are present in the document."""

        logger.info(f"Removing filtered documents (filter={custom_filter})...")

        filtered_documents = self.__get_collection().find(custom_filter)
        # List to store ids of documents to delete
        ids_to_delete = []

        for doc in filtered_documents:
            if doc['_id'] not in ids_to_delete:  # Avoid duplicates
                ids_to_delete.append(doc['_id'])

        self.__delete_many_documents(ids_to_delete)

    def update_parts_of_speech(self, parts_of_speech: dict):
        """Updates the partOfSpeech values from the old to new scheme"""

        for old_value, new_value in parts_of_speech.items():
            update_result = self.__get_collection().update_many({"partOfSpeech": old_value},
                                                                {"$set": {"partOfSpeech": new_value}})

            logger.info(f"Updated {update_result.modified_count} where partOfSpeech was '{old_value}'.")


if __name__ == '__main__':
    # EUTODO: Get vars from .env file
    DB_URL = "mongodb://localhost:27017/"
    DB_NAME = "dictionary"
    COLLECTION_NAME = "vocabulary"

    dc = DataCleaner(DB_URL, DB_NAME, COLLECTION_NAME)
    dc.open_connection()
    dc.convert_object_ids_to_strings()
    dc.delete_filtered_documents(custom_filter={'$or': [{'wordName': {'$exists': False}},
                                                        {'partOfSpeech': {'$exists': False}},
                                                        {'definition': {'$exists': False}},
                                                        ]})
    dc.delete_filtered_documents(custom_filter={"partOfSpeech": ""})
    dc.update_parts_of_speech(parts_of_speech={'n.': 'noun',
                                               'adv.': 'adverb',
                                               'adj.': 'adjective',
                                               'v.': 'verb',
                                               'conj.': 'conjunction',
                                               'interj.': 'interjection',
                                               'prep.': 'preposition',
                                               'pron.': 'pronoun'})

    dc.delete_filtered_documents(custom_filter={"partOfSpeech": {"$nin": ['noun',
                                                                          'adverb',
                                                                          'adjective',
                                                                          'verb',
                                                                          'conjunction',
                                                                          'interjection',
                                                                          'preposition',
                                                                          'pronoun',]}})
    dc.close_connection()
