import { Link } from "react-router-dom";

export function BookPreview({ book }) {
    return (
        <div className="book-preview">
            <div>
                <h4>{book.title}</h4>
                <p>by {book.authors.join(", ")}</p>
            </div>
            <Link to={`/books/${book.id}`}>
                <img className="book-image" src={book.thumbnail} />
            </Link>
            <div>
                <h5>{book.categories.join(", ")}</h5>
            </div>
        </div>
    )
}