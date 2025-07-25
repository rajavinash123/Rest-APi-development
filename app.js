const express = require('express');
const app = express();

// Middleware
app.use(express.json());

let book = [
    { id: 1, title: 'book 1' },
    { id: 2, title: 'book 2' },
    { id: 3, title: 'book 3' },
];

// Home Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our book store API' });
});

// Get all books
app.get('/get', (req, res) => {
    res.json(book);
});

// Get single book by ID
app.get('/get/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const foundBook = book.find(item => item.id === id); 

    if (foundBook) {
        res.status(200).json(foundBook);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Add a new book
app.post('/add', (req, res) => {
    const newBook = {
        id: book.length + 1,
        title: `Book ${book.length + 1}`
    };

    book.push(newBook);
    res.status(200).json({
        data: newBook,
        message: 'New book is added successfully'
    });
});

// Update the book-> PUT http://localhost:3000/update/1
app.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const findCurrentBook = book.find(bookItem => bookItem.id === id);

    if (findCurrentBook) {
        findCurrentBook.title = req.body.title || findCurrentBook.title;
        res.status(200).json({
            message: `Book with id ${req.params.id} updated successfully`,
            data: findCurrentBook
        });
    } else {
        res.status(404).json({
            message: 'Book is not found',
        });
    }
});

// Delete book->//DELETE http://localhost:3000/delete/2
app.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const findIndexOfCurrentBook = book.findIndex(item => item.id === id);

    if (findIndexOfCurrentBook !== -1) {
        const deletedBook = book.splice(findIndexOfCurrentBook, 1);
        res.status(200).json({
            message: 'Book deleted successfully',
            data: deletedBook[0]
        });
    } else {
        res.status(404).json({
            message: 'Book is not found',
        });
    }
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});





