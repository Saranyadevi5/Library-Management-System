import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditBooks from './edit_library';
import Login from './login';
import AddBookModal from './add_book';

const ListLibrary = ({ isTableView, setIsTableView }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [itemsPerPage] = useState(9);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({}); // Added state for the new book

  const initialBook = {
    book_id: null,
    title: '',
    author: '',
    isbn: '',
    publication_date: '',
  };

  const deleteBook = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/books_delete/${id}`);

      if (response.status === 200) {
        fetchBooks();
      } else {
        console.error('Failed to delete book.');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const LendBook = async (bookId) => {
    try {
      const response = await axios.put(`http://localhost:5000/Lend/${bookId}`);

      if (response.status === 200) {
        console.log(`Book ${bookId} value increased successfully!`);

        // Update the quantity of the lent book in the local state
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.book_id === bookId
              ? { ...book, available_quantity: book.available_quantity + 1 }
              : book
          )
        );

        // Notify success using toast
        toast.success(`Stocks added successfully for Book: ${bookId}`);
      } else {
        console.error(`Failed to lend book ${bookId}.`);
        // Notify failure using toast
        toast.error(`Failed to add stocks for Book ${bookId}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/books');

      // Sort the books array by book_id in ascending order
      const sortedBooks = res.data.sort((a, b) => a.book_id - b.book_id);

      setBooks(sortedBooks);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addToCart = (bookId) => {
    // Implement your logic to add to cart
    console.log(`Book ${bookId} added to cart!`);
  };

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, Math.ceil(books.length / itemsPerPage)));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const handleLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const addBook = async (newBook) => {
    try {
      const response = await axios.post('http://localhost:5000/books', newBook);

      if (response.status === 201) {
        fetchBooks();
        closeModal(); // Close the modal after adding a new book
        // Notify success using toast
        toast.success('Book added successfully');
      } else {
        console.error('Failed to add a new book.');
        // Notify failure using toast
        toast.error('Failed to add a new book');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const openModal = () => {
    // Fetch the last book's id and add 1 to get the new book_id
    const lastBookId = books.length > 0 ? books[books.length - 1].id : 0;
    const newBookId = lastBookId + 1;

    // Set the newBook with the automatically assigned book_id
    const newBook = { ...initialBook, book_id: newBookId };

    // Set the newBook in the state and open the modal
    setNewBook(newBook);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Fragment>
      <div className={`container mt-100 ${isDarkMode ? 'dark-mode' : ''}`} style={{ marginTop: '10%' }}>
        <div className="d-flex justify-content-center">
          <input
            type="text"
            className="form-control w-50 margin-10"
            placeholder="Search by title or author"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>

        <div className="row justify-content-center mt-3">
          {isTableView ? (
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Quantity</th>
                  <th>Stocks Check</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentBooks
                  .filter((book) => {
                    if (searchTerm === '') {
                      return book;
                    } else if (
                      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      book.author.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                      return book;
                    }
                  })
                  .map((book) => (
                    <tr key={book.book_id}>
                      <td>{book.book_id}</td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.isbn}</td>
                      <td>{book.available_quantity}</td>
                      
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => LendBook(book.book_id)}
                        >
                          Add stocks
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteBook(book.book_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            currentBooks
              .filter((book) => {
                if (searchTerm === '') {
                  return book;
                } else if (
                  book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  book.author.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return book;
                }
              })
              .map((book) => (
                <div className="col-md-4 mb-4" key={book.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Book Name: {book.title}</h5>
                      <p className="card-text">
                        Author: {book.author} <br />
                        ISBN: {book.isbn}
                      </p>
                      <p>Quantity: {book.quantity}</p>
                      <div className="d-flex md-4 justify-content-center ">
                        <EditBooks book={book} />
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteBook(book.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        <div className="row justify-content-center mt-3">
        <button className="btn btn-primary" onClick={() => openModal()}>
  Add Book
</button>

        </div>

        {/* Render ToastContainer for notifications */}
        <ToastContainer position="bottom-right" autoClose={3000} />

        <div className="pagination d-flex justify-content-center">
          <button className="pagination-button" onClick={goToPreviousPage}>
            Back
          </button>
          {[...Array(Math.ceil(books.length / itemsPerPage))].map((_, i) => (
            <button
              key={i}
              className={`pagination-button ${
                currentPage === i + 1 ? 'active' : ''
              }`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button className="pagination-button" onClick={goToNextPage}>
            Next
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ListLibrary;
