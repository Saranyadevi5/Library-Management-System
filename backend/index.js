const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a book
app.post("/books", async (req, res) => {
    try {
      const { title, author, isbn, published_year } = req.body;
  
      const newBook = await pool.query(
        "INSERT INTO books (title, author, isbn, published_year) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, author, isbn, published_year]
      );
  
      res.json(newBook.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
});

//get all books
app.get("/books", async (req, res) => {
    try {
      const allBooks = await pool.query("SELECT * FROM books");
      res.json(allBooks.rows);
    } catch (err) {
      console.error(err.message);
    }
});

// Get a specific book
app.get("/books/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const book = await pool.query("SELECT * FROM books WHERE book_id = $1", [id]);
  
      res.json(book.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
});

// Update a book
app.put("/books/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, isbn, published_year } = req.body;
      const updateBook = await pool.query(
        "UPDATE books SET title = $1, author = $2, isbn = $3, published_year = $4 WHERE book_id = $5",
        [title, author, isbn, published_year, id]
      );

      res.json("Book was updated!");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
});

// Delete a book
app.delete("/books_delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteBook = await pool.query("DELETE FROM books WHERE book_id = $1", [id]);
      res.json("Book was deleted!");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
});

// Borrow a book
app.put("/borrow/:id", async (req, res) => {
  try {
      const { id } = req.params;

      // Check if the book is available
      const book = await pool.query("SELECT * FROM books WHERE book_id = $1", [id]);
      const availableQuantity = book.rows[0].available_quantity;

      if (availableQuantity > 0) {
          // If available, decrement the available_quantity
          const borrowBook = await pool.query(
              "UPDATE books SET available_quantity = available_quantity - 1 WHERE book_id = $1",
              [id]
          );

          res.json("Book borrowed successfully!");
      } else {
          res.status(400).json("Book is not available for borrowing.");
      }
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
  }
});

// Lend a book
app.put("/lend/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Increment the available_quantity for the given book_id
    const lendBook = await pool.query(
      "UPDATE books SET available_quantity = available_quantity + 1 WHERE book_id = $1",
      [id]
    );

    res.json("Book lent successfully!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(5000, () => {
  console.log("server has started on port 5000");
});