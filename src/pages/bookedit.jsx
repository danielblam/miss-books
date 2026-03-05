import { useState, useEffect } from "react"
import { bookService } from "../services/book.service";
import { useNavigate, useParams } from "react-router-dom";

export function BookEdit() {

    var { bookid } = useParams();

    var [data, setBookData] = useState(null)

    useEffect(() => {
        if(bookid != undefined) {
            fetchBook();
        }
    }, [])

    const fetchBook = async () => {
        var book = await bookService.get(bookid)
        setBookData(book)
    }

    var [inputs, setInputs] = useState({ currency: "ILS" })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const submit = async () => {
        if(bookid) return // TODO: implement saving edited book
        console.log(inputs)
        var keys = Object.keys(inputs)
        var required = ["currency", "title", "author", "price"]
        for (const name of required) {
            if (!keys.includes(name) || inputs[name] == '') return
        }
        await bookService.createBook(inputs)
        navigate("/books", { state: { refresh: true } })
    }

    if(bookid != undefined && !data) return <div>Loading...</div>

    return (
        <div className="book-edit-container">
            <h1>{bookid ? `Editing ${data.title}` : "Add a new book"}</h1>
            <div className="book-edit-form-title">Title:</div>
            <input
                className="book-edit-form-input text-input"
                name="title"
                onChange={handleChange}
                value={!data ? inputs.title : data.title}
            />
            <div className="book-edit-form-title">Author:</div>
            <input
                className="book-edit-form-input text-input"
                name="author"
                onChange={handleChange}
                value={!data ? inputs.author : data.authors.join(", ")}
            />
            <div className="book-edit-form-title">Price:</div>
            <div className="book-edit-input-group">
                <input
                    className="book-edit-form-input number-input"
                    type="number"
                    name="price"
                    onChange={handleChange}
                />
                <select className="book-edit-form-input" name="currency" onChange={handleChange}>
                    <option>ILS</option>
                    <option>USD</option>
                    <option>EUR</option>
                </select>
            </div>
            <br />
            <button className="fs-150" onClick={submit}>Submit</button>
        </div>
    )
}