const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

app.use(express.json()); 
const booksFilePath = path.join(__dirname, 'books.json');

function readBooksFromFile() {
    const data = fs.readFileSync(booksFilePath, 'utf-8');
    return JSON.parse(data);
}

function writeBooksToFile(books) {
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2), 'utf-8');
}

app.get('/books', (req, res) => {
    const books = readBooksFromFile();
    res.json(books);
});

app.get('/books/:isbn', (req, res) => {
    const books = readBooksFromFile();
    const book = books.find(b => b.isbn === req.params.isbn);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
});

app.post('/books', (req, res) => {
    const newBook = req.body;
    if (!newBook.isbn || !newBook.title || !newBook.author) {
        return res.status(400).json({ error: 'Missing required book fields (isbn, title, author)' });
    }

    const books = readBooksFromFile();
    const existingBook = books.find(b => b.isbn === newBook.isbn);
    if (existingBook) {
        return res.status(400).json({ error: 'A book with this ISBN already exists' });
    }

    books.push(newBook);
    writeBooksToFile(books);

    res.status(201).json({ message: 'Book added', newBook });
});

app.put('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const updatedDetails = req.body;  

    const books = readBooksFromFile();
    const bookIndex = books.findIndex(b => b.isbn === isbn);

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    books[bookIndex] = { ...books[bookIndex], ...updatedDetails }; 

    writeBooksToFile(books);

    res.status(200).json({ message: 'Book updated successfully', book: books[bookIndex] });
});

app.patch('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const updatedDetails = req.body; 

    const books = readBooksFromFile();
    const bookIndex = books.findIndex(b => b.isbn === isbn);

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }


    books[bookIndex] = { ...books[bookIndex], ...updatedDetails }; 

    writeBooksToFile(books);

    res.status(200).json({ message: 'Book updated successfully', book: books[bookIndex] });
});


app.delete('/books/:isbn', (req, res) => {
    const books = readBooksFromFile();
    const updatedBooks = books.filter(b => b.isbn !== req.params.isbn);

    if (books.length === updatedBooks.length) {
        return res.status(404).json({ error: 'Book not found' });
    }

    writeBooksToFile(updatedBooks);
    res.status(200).json({ message: 'Book deleted successfully' });
});


// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
