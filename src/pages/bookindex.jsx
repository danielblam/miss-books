import { useState, useEffect } from "react";
import { BookList } from "../cmps/booklist";
import { bookService } from "../services/book.service";
import { Link } from "react-router-dom";

export function BookIndex() {
    var [data, setBookData] = useState(null)

    useEffect(() => {
        fetchBooks();
    }, [])

    const fetchBooks = async () => {
        var books = await bookService.query()
        setBookData(books)
    }

    return (
        <div className="book-index-container">
            <div className="add-book-button">
                <Link to="/books/edit"><button>Add a Book</button></Link>
            </div>
            <div class="book-index">
                <BookList books={data} />
            </div>
        </div>
    )
}