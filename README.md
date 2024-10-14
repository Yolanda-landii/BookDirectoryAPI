# Book Directory API

A RESTful API for managing a book directory built with **Node.js** and **Express.js**. This API allows users to perform CRUD operations on a list of books stored in a `books.json` file. Users can retrieve, add, update, and delete books by interacting with various endpoints.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
  - [GET /books](#get-books)
  - [GET /books/:isbn](#get-booksisbn)
  - [POST /books/:isbn/publisher](#post-booksisbnpublisher)
  - [PUT /books/:isbn](#put-booksisbn)
  - [DELETE /books/:isbn](#delete-booksisbn)
- [Data Validation](#data-validation)
- [Error Handling](#error-handling)
- [Dependencies](#dependencies)
- [License](#license)

---

## Features

- **Book CRUD Operations**: Create, read, update, and delete books using RESTful endpoints.
- **JSON File Storage**: All book data is stored in a `books.json` file.
- **Express Middleware**: Handles JSON parsing and routing.
- **Error Handling**: Includes validation and appropriate HTTP status codes for errors.
- **Publisher Updates**: Allows updates to specific fields (like publisher) without replacing the entire book record.

### Book Model

Each book in the directory has the following properties:
- **Title** (string): The title of the book (required).
- **Author** (string): The author of the book (required).
- **Publisher** (string): The name of the publishing company (optional).
- **Published Date** (string): The date when the book was published (optional).
- **ISBN** (string): The unique identifier for the book (required).

---

## Requirements

- **Node.js** (>= v14)
- **npm** (Node Package Manager)
- **Express.js** (for routing)
- **File System (fs)**: To read and write data to the file system.

---

## Setup and Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
