# Tresaurus Telegram Bot

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technical Documentation](#technical-documentation)
  - [Application Modules](#application-modules)
     - [Telegram Bot](#telegram-bot-module)
     - [API](#api-module)
       - [Features](#api-features)
       - [Endpoints](#api-endpoints)
     - [Admin Panel](#admin-panel-module)
  - [Database](#database-overview)
    - [Usage](#db-usage)
    - [Configuration](#db-configuration)

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
Built using modern technologies like FastAPI for the backend and React and Bootstrap for the frontend,
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

> **_NOTE:_**  TBD

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

#### API Module

> **_NOTE:_**  TBD

This module provides the backend functionality for the Tresaurus Telegram bot,
utilizing FastAPI to create a robust and efficient API.

##### API Features

* Word Management: Add, update, delete, and retrieve vocabulary words.
* Quiz Generation: Generate and manage quizzes for vocabulary practice.
* Progress Tracking: Track user progress and provide feedback.

##### API Endpoints

All available endpoints can be found at `http://<ip-address>:<port>/docs/` or `http://<ip-address>:<port>/redoc/`,
where `<ip-address>` and `<port>` are the address and port of the deployed server.

#### Admin Panel Module

> **_NOTE:_**  TBD

The Admin Panel includes several essential pages designed to manage and interact with the application's data:

* Home Page (`/`): The main entry point to the admin panel,
providing an overview of key metrics and quick access to other pages.
* Words Page (`/words`): Displays all words in the vocabulary list and allows filtering based on specific criteria.
* New Word Page (`/words/new`): Contains a form for adding new words to the vocabulary list.
* Single Word Page (`/words/:id`): Enables viewing, updating, and deleting a specific word by its ID.
* About Page (`/about`): Provides information about the application and its purpose.

### Database Overview

The project's database is built on MongoDB.

To facilitate easy access and management of the MongoDB database, we utilize `mongo-express`,
a web-based administrative interface for MongoDB.
Mongo-express provides a user-friendly interface for interacting with the database, making tasks such as CRUD operations,
data exploration, and performance monitoring straightforward and accessible.

#### DB Usage

To access the MongoDB database via mongo-express, ensure that both MongoDB and mongo-express services are running.
By navigating to the specified URL (usually http://localhost:8081 or a similar address depending on your configuration),
you can interact with the database through the mongo-express interface.

#### DB Configuration

In the project's configuration files, the connection settings for MongoDB and mongo-express are defined.
These settings include the database URI, authentication details,
and other relevant parameters necessary for establishing a connection and securing the database.
