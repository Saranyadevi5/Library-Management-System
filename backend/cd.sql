CREATE TABLE books (
  book_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  isbn VARCHAR(13),
  published_year INTEGER
);



INSERT INTO books (id, title, author, published_year, isbn)
VALUES
(1, 'To Kill a Mockingbird', 'Harper Lee', 1960, '97812345678901'),
(2, '1984', 'George Orwell', 1949, '97823456789012'),
(3, 'The Great Gatsby', 'F. Scott Fitzgerald', 1925, '97834567890123'),
(4, 'Pride and Prejudice', 'Jane Austen', 1813, '97845678901234'),
(5, 'The Catcher in the Rye', 'J.D. Salinger', 1951, '97856789012345'),
(6, 'The Hobbit', 'J.R.R. Tolkien', 1937, '97867890123456'),
(7, 'Moby Dick', 'Herman Melville', 1851, '97878901234567'),
(8, 'War and Peace', 'Leo Tolstoy', 1869, '97889012345678'),
(9, 'The Odyssey', 'Homer', -800, '97890123456789'),
(10, 'Crime and Punishment', 'Fyodor Dostoevsky', 1866, '97801234567890'),
(11, 'Brave New World', 'Aldous Huxley', 1932, '97812345678902'),
(12, 'The Lord of the Rings', 'J.R.R. Tolkien', 1954, '97823456789013'),
(13, 'The Chronicles of Narnia', 'C.S. Lewis', 1950, '97834567890124'),
(14, 'A Tale of Two Cities', 'Charles Dickens', 1859, '97845678901235'),
(15, 'Les Misérables', 'Victor Hugo', 1862, '97856789012346'),
(16, 'The Da Vinci Code', 'Dan Brown', 2003, '97867890123457'),
(17, 'The Alchemist', 'Paulo Coelho', 1988, '97878901234568'),
(18, 'One Hundred Years of Solitude', 'Gabriel García Márquez', 1967, '97889012345679'),
(19, 'The Little Prince', 'Antoine de Saint-Exupéry', 1943, '97890123456780'),
(20, 'Animal Farm', 'George Orwell', 1945, '97801234567891'),
(21, 'The Hunger Games', 'Suzanne Collins', 2008, '97812345678903'),
(22, 'The Kite Runner', 'Khaled Hosseini', 2003, '97823456789014'),
(23, 'The Girl on the Train', 'Paula Hawkins', 2015, '97834567890125'),
(24, 'The Fault in Our Stars', 'John Green', 2012, '97845678901236'),
(25, 'Gone Girl', 'Gillian Flynn', 2012, '97856789012347');




