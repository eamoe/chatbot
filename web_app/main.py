import os

from flask import Flask, request, render_template, redirect, url_for
from pymongo import MongoClient
import os


app = Flask(__name__)

mongo_host = os.getenv('MONGO_HOST', default='mongodb')
mongo_port = int(os.getenv('MONGO_PORT', default=27017))

client = MongoClient(host=mongo_host,
                     port=mongo_port)

db = client.mydatabase

dictionary_collection = db.vocabulary


@app.route(rule='/')
def home():
    words = dictionary_collection.find()
    return render_template('index.html', words=words)


@app.route(rule='/add_word', methods=['POST'])
def add_word():
    if request.method == 'POST':
        word_data = {
            'name': request.form['name'],
            'part_of_speech': request.form['part_of_speech'],
            'definition': request.form['definition']
        }
        dictionary_collection.insert_one(word_data)
    return redirect(url_for('home'))


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
