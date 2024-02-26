import React, { useState } from 'react';

const AddBookForm = ({ addBook, closeModal }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publication_date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming addBook is a function that adds a new book to the list
    await addBook(formData);
    closeModal();
  };

  return (
    <div className="add-book-form-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Author:</label>
        <input type="text" name="author" value={formData.author} onChange={handleChange} required />

        <label>ISBN:</label>
        <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} required />

        <label>Publication Date:</label>
        <input
          type="text"
          name="publication_date"
          value={formData.publication_date}
          onChange={handleChange}
          required
        />

        <div className="button-container">
          <button type="submit" className="btn btn-primary">
            Add Book
          </button>
          <button type="button" className="btn btn-secondary" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
