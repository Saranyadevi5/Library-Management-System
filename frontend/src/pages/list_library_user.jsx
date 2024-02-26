import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListLibraryUser = ({ isTableView, setIsTableView }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favs, setFavs] = useState([]);
  const [itemsPerPage] = useState(10);

  const deleteBook = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/books/${id}`);

      if (response.status === 200) {
        setBooks(books.filter((book) => book.book_id !== id));
      } else {
        console.error('Failed to delete book.');
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

  const addToFav = (id) => {
    setFavs([...favs, id]);
  };

  const BorrowBook = async (bookId) => {
    try {
      // Check if the book is available (quantity > 0)
      const bookToBorrow = books.find((book) => book.book_id === bookId);
  
      if (!bookToBorrow || bookToBorrow.available_quantity === 0) {
        // Notify error using toast
        toast.error(`Book "${bookToBorrow.title}" is not available.`);
        return;
      }
  
      const response = await axios.put(`http://localhost:5000/Borrow/${bookId}`);
  
      if (response.status === 200) {
        console.log(`Book ${bookId} borrowed successfully!`);
  
        // Update the quantity of the borrowed book in the local state
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.book_id === bookId
              ? { ...book, available_quantity: book.available_quantity - 1 }
              : book
          )
        );
  
        // Notify success using toast with the book title
        toast.success(`Book "${bookToBorrow.title}" borrowed successfully!`);
      } else {
        console.error(`Failed to borrow book ${bookId}.`);
        // Notify failure using toast
        toast.error(`Failed to borrow book ${bookId}`);
      }
    } catch (err) {
      console.error(err.message);
    }
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

  return (
    <Fragment>
      <div className={`container mt-100 ${isDarkMode ? 'dark-mode' : ''}`} style={{ marginTop: '10%' }}>
        <div className="d-flex justify-content-center">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by title or author"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <div className="row justify-content-center mt-3">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>ISBN</th>
                <th> Quantity </th>
                <th>Borrow Book</th>
                <th>Favourite</th>
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
                        onClick={() => BorrowBook(book.book_id)}
                      >
                        Borrow
                      </button>
                    </td>
                    <td>
                      {favs.includes(book.book_id) ? (
                        <button className="btn btn-danger">Fav</button>
                      ) : (
                        <button
                          className="btn btn-danger"
                          onClick={() => addToFav(book.book_id)}
                        >
                          Add Fav
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
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
              className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
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

export default ListLibraryUser;
