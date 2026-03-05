import { useEffect, useState } from "react"
import { bookService } from "../services/book.service";
import { Link, useNavigate, useParams } from "react-router-dom";

export function BookDetails() {
    var [data, setBookData] = useState(null)
    const { bookid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchBook();
    }, [])

    const fetchBook = async () => {
        var book = await bookService.get(bookid)
        setBookData(book)
    }

    const deleteBook = async () => {
        await bookService.remove(data.id)
        navigate("/books", { state: { refresh: true } })
    }

    if (data == null) return <div>Loading...</div>

    var tags = []
    if (data.pageCount < 100) tags.push("Light Reading")
    else if (data.pageCount < 200) tags.push("Decent Reading")
    else if (data.pageCount > 500) tags.push("Serious Reading")

    var yearDiff = new Date().getFullYear() - data.publishedDate
    if (yearDiff <= 1) tags.push("New")
    else if (yearDiff >= 10) tags.push("Vintage")

    return (
        <>
            <div className="book-details-back">
                <Link to="/books" className="black">⬅️ Back</Link>
            </div>
            <div className="book-details-container">
                <div className="book-details-image">
                    <img src={data.thumbnail} />
                </div>
                <div className="book-details">
                    <h2>{data.title}</h2>
                    <p>{data.authors.join(", ")}</p>
                    <br />
                    <p>{data.description}</p>
                    <h4 className="book-details-tags">{tags.join(", ")}</h4>
                    <br />
                    <h2>{data.listPrice.amount} {data.listPrice.currencyCode}</h2>
                </div>
            </div>
            <div className="book-details-buttons">
                <Link to={`/books/edit/${data.id}`}><button>Edit</button></Link>
                <button onClick={deleteBook}>Delete</button>
            </div>
        </>
    )
}