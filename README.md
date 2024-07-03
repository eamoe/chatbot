# Tresaurus Telegram Bot

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technical Documentation](#technical-documentation)
  - [Application Modules](#application-modules)
     - [Telegram Bot](#telegram-bot-module)
     - [API](#api-module)
     - [Admin Panel](#admin-panel-module)

## Introduction

**Tresaurus** is your personal vocabulary assistant on Telegram!

Tresaurus helps you memorize new words effortlessly through interactive quizzes and personalized word lists,
making language learning engaging and effective. Perfect for students, professionals,
and language enthusiasts looking to expand their vocabulary.

## Features

Below is a comprehensive list of commands and features to guide you through using the bot.

- `/start` Initialize the bot and receive a welcome message.
This command provides instructions on how to use the bot effectively.

- `/help` Get a list of all available commands and their descriptions.
This is a quick reference to understand the functionalities offered by the bot.

- `/addword [word] [definition]` Add new words along with their definitions to your personal vocabulary list.
This helps in expanding your vocabulary database.

- `/showwords` Display the list of all words and their definitions that you have added.
This allows you to review your vocabulary at any time.

- `/removeword [word]` Remove a word from your vocabulary list.
This is useful for managing and updating your vocabulary.

- `/quiz` Start a vocabulary quiz where the bot randomly picks a word and asks for its definition or vice versa.
This helps in testing and reinforcing your knowledge.

- `/translate [word] [language]` Translate a given word into a specified language using an external API,
such as the Google Translate API. This feature aids in understanding words in different languages.

- `/examples [word]` Provide example sentences using the given word to help understand its usage in context.
This is useful for learning how to use new words correctly.

- `/synonyms [word]` Provide synonyms for a given word. This helps in expanding your vocabulary with similar words.

- `/randomword` Show a random word from your vocabulary list to encourage regular revision
and keep your learning engaging.

- `/review [interval]` Set a review interval (daily, weekly) to get periodic reminders to review your vocabulary.
This helps in consistent learning and retention.

- `/import [file]` Allow users to import a list of words from a file (e.g., CSV format).
This is useful for quickly adding a large number of words to your list.

- `/export` Allow users to export their vocabulary list to a file.
This helps in backing up your data or sharing it with others.

- `/progress` Track and display your progress, including words learned, quizzes taken, and success rates.
This helps in monitoring your improvement over time.

- `/settings` Configure user preferences such as preferred quiz type, notification settings, and more.
This allows for a personalized learning experience.

- `/feedback` Provide a way for users to give feedback about the bot or report issues.
This helps in improving the bot based on user input.

By using these commands, you can effectively manage your vocabulary learning process,
track your progress, and personalize your learning experience. Happy learning!

## Technical Documentation

Welcome to the technical documentation for our Telegram Bot!
This bot is a powerful tool designed to help users enhance their vocabulary through a variety of interactive features.
Built using modern technologies like FastAPI for the backend and React for the frontend,
this bot integrates seamlessly with Telegram to offer a smooth and engaging user experience.
This documentation covers all aspects of the bot's features, commands,
and implementation details to help developers understand and contribute to the project.

### Application Modules

Our Telegram Bot application is composed of several key modules,
each designed to handle specific functionalities and provide a comprehensive user experience.
The main modules include:

* **Telegram Bot**: This module handles all interactions with users on the Telegram platform.
It processes commands, sends responses, and manages user sessions to ensure a seamless and interactive experience.
* **API**: Built with FastAPI, this module serves as the backend of the application.
It manages the database, processes requests from the bot and admin panel,
and ensures secure and efficient data handling. This module also includes endpoints for adding, retrieving,
and managing vocabulary data.
* **Admin Panel**: The admin panel provides a user-friendly interface for users and administrators
to manage the application's data and settings. It allows for the oversight of user activities, monitoring progress,
and making updates to the word lists and user preferences.

Together, these modules form the backbone of our Telegram Bot application,
ensuring a cohesive and efficient system for both users and administrators.
In this section, we will delve into the specifics of each module, exploring their functionalities, structures,
and how they interact with each other to deliver a robust vocabulary learning platform.

#### Telegram Bot Module

#### API Module

#### Admin Panel Module

```
telegram-bot/
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

### Admin

Available pages:
* A home page, at the route `/`.
* A words page for displaying all words or according to some filter: `/words`.
* A new word page, with a form for inserting new words: `/words/new`.
* A single word page, for viewing/ updating/ deleting a single word by ID: `/words/:id`.
* An about page: `/about`.

### API

This module provides the backend functionality for Tresaurus Telegram bot. The API is built using FastAPI.

#### API Features

**Word Management**: Add, update, delete, and retrieve vocabulary words.
**Quiz Generation**: Generate and manage quizzes for vocabulary practice.
**Progress Tracking**: Track user progress and provide feedback.

#### Endpoints

All available endpoints can be found at `http://localhost:8475/docs/` or `http://localhost:8475/redoc/`.

### Database

As an interface for the MongoDB, the mongo-express is used. It can be reached at `http://localhost:8081/`

## Installation

## Project Description

## Project Structure

The project consists of several modules:

2. `web_app` is a Flask web application that communicates with MongoDB and is used for populating the DB through the web.

3. `api` is a FastAPI-based API application.

4. `admin` is a React app with Bootstrap for styling.

This app is dedicated to manage Tresaurus data in the web. 

The source code for Bootstrap can be found under `src_bootstrap` directory. In order to compile it, run the following commands:

```console
npx mix -dev
npx mix --production
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
 docker compose down --rmi all
 docker compose config
```

## MongoDB

```console
mongosh
show dbs
user <db_name>
show collections
```

### Read Operations

```
db.cars.find() # SELECT * FROM TABLE
db.cars.find({year:2019})
db.cars.find({year:{'$gt':2015},price:{$lt:7000},brand:'Ford'}).pretty() # find all Ford cars made in 2016 or later and priced at less than 7,000 euros.

$gt (greater than), $lt (less than), and $in (providing a list of values)

findOne() is similar to find() and it takes an optional filter parameter but returns only the first document that satisfies the criteria.

Projection: allows us to limit and set the fields that will be returned from the query results.
0 - exclude
1 - include
db.cars.find({brand:'Ford',make:'Fiesta'},{year:1,km:1,_id:0}).sort({'year':1}).limit(5)
```

### Create Operations

```
db.cars.insertOne({'brand':'Magic Car','make':'Green Dragon', 'year':1200})

Response:
{
  acknowledged: true,
  insertedId: ObjectId('667d325a33136a66690e1d20')
}

db.cars.insertMany([{brand:'Magic Car',make:'Yellow Dragon',year:1200},{brand:'Magic Car',make:'Red Dragon',legs:4}])

Response:
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('667d32a233136a66690e1d21'),
    '1': ObjectId('667d32a233136a66690e1d22')
  }
}
```

### Update Operations

```
db.cars.updateOne({make:'Fiesta'},{$set:{'Salesman':'Marko'}}) # updates first encountered document.

Response:
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}

db.cars.updateMany({make:'Fiesta'},{$inc:{price:-200}})

Response:
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 106,
  modifiedCount: 106,
  upsertedCount: 0
}

MongoDB also provides a replaceOne operator that takes a filter, like our earlier methods, but expects also an entire document that will take the place of the preceding one.
```

### Delete Operations

```
db.cars.deleteMany({brand:'Magic Car'})

Response:
{ acknowledged: true, deletedCount: 3 }

db.cars.drop()
```

### Cursors

One important thing to note is that the find methods return a cursor and not the actual results.

```
let fiesta_cars = db.cars.find({'make':'Fiesta'})
fiesta_cars.hasNext()
fiesta_cars.next()

db.cars.find({year:2015},{brand:1,make:1,year:1,_id:0,price:1}).sort({price:1}).limit(5)
```

### Aggregation framework

```
match --> project -> group --> sort --> limit
```

```
db.cars.aggregate([{$match: {brand:"Fiat"}}])

db.cars.aggregate([
{$match: {brand:"Fiat"}},
{$group:{_id:{model:"$make"},avgPrice: { $avg: "$price"} }}
])

db.cars.aggregate([
{$match: {brand:"Fiat"}},
{$group:{_id:{year:"year"},avgPrice: { $avg: "$price"} }}
])

db.cars.aggregate([
  {$match:{brand:"Opel"}},
  {$project:{_id:0,price:1,year:1,fullName:{$concat:["$make"," ","$brand"]}}},      
   {$group:{_id:{make:"$fullName"},avgPrice:{$avg:"$price"}}},
  {$sort: {avgPrice: -1}},
  {$limit: 10}
]).pretty()
```

## FastAPI

Sample program:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello FastAPI"}
```

Running the app (first `app` is `.py` file, the second `app` is FastAPI instance):

```console
uvicorn app:app --reload
```

The `--reload` flag tells Uvicorn to reload the server each time we save our code.

To see the API docs:

```
http://localhost:8000/docs
```

One of the first really useful features present in FastAPI is its automatically generated documentation. The documentation is based on the `OpenAPI` specification and relies heavily on Python hints and the parsing and validation library `Pydantic`.

FastAPI sets the 200 status by default if it doesn’t encounter exceptions, so it is up to us to set the correct codes for the various API operations, such as 204 No Content for deleting, 201 for creating, and so on.

## React Application

```console
sudo npx create-react-app cars
sudo cd cars && npm start
```

Moving on to the `src` directory, this is where we will be doing all of our work:

The `App.js` file that represents our entire application – all the components, menus, headers and footers, lists, and controls – will be hosted on this file, which, in turn, will be rendered in our single `div` with the `id` of the root in the HTML file.

We might safely say that `JSX` is the glue that holds the whole React concept together. The smallest building blocks of a React page or app are so-called `React elements`. A simple element might be as follows:

```js
const title = <h1>The Car Sales App</h1>
```

A state can be thought of as a set of data that represents the user interface (UI) at any given moment.

# How to restore test data

1. Upload data with mongo express.
2. Change DB_URL in utils/data_cleaner.py to DB_URL = "mongodb://10.211.55.11:27017/" and run it in PyCharm.

docker system prune - sometimes helps.
