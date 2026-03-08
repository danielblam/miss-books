import { useState, useEffect, useRef } from "react"
import { bookService } from "../services/book.service";
import { useNavigate, useParams } from "react-router-dom";

export function BookEdit() {

    var { bookid } = useParams();
    const navigate = useNavigate();

    var [data, setBookData] = useState(null)
    var [inputs, setInputs] = useState({ currency: "ILS" })
    var submitted = useRef(false)
    var loadedInputs = useRef(false)

    useEffect(() => {
        if (bookid != undefined) {
            fetchBook();
        }
    }, [])

    const fetchBook = async () => {
        var book = await bookService.get(bookid)
        setBookData(book)
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const loadInputs = () => {
        console.log(data)
        setInputs({
            title: data.title,
            author: data.authors.join(", "),
            price: data.listPrice.amount,
            currency: data.listPrice.currencyCode
        })
    }

    const submit = async () => {
        var keys = Object.keys(inputs)
        var required = ["currency", "title", "author", "price"]
        for (const name of required) {
            if (!keys.includes(name) || inputs[name] == '') return
        }
        if (!bookid) {
            await bookService.createBook(inputs)
            navigate("/books", { state: { refresh: true } })
        }
        else {
            console.log(data.title)
            submitted.current = true
            setBookData(values => ({
                ...values,
                title: inputs.title,
                authors: inputs.author.split(", "),
                listPrice: {
                    amount: inputs.price,
                    currencyCode: inputs.currency,
                    isOnSale: data.listPrice.isOnSale
                }
            }))
        }
    }

    useEffect(() => {
        async function saveEditedBook() {
            await bookService.save(data)
            navigate("/books", { state: { refresh: true } })
        }
        if(submitted.current) saveEditedBook() 
        if(!loadedInputs.current && data != null) { // load book data into inputs only once
            loadedInputs.current = true
            loadInputs()
        }
    }, [data])

    if (bookid != undefined) {
        if (!data) return <div>Loading...</div>
    }

    if(submitted.current) {
        return <h1>Submitting...</h1>
    }

    return (
        <div className="book-edit-container">
            <h1>{bookid ? `Editing ${data.title}` : "Add a new book"}</h1>
            <div className="book-edit-form-title">Title:</div>
            <input
                className="book-edit-form-input text-input"
                name="title"
                onChange={handleChange}
                value={inputs.title}
            />
            <div className="book-edit-form-title">Author:</div>
            <input
                className="book-edit-form-input text-input"
                name="author"
                onChange={handleChange}
                value={inputs.author}
            />
            <div className="book-edit-form-title">Price:</div>
            <div className="book-edit-input-group">
                <input
                    className="book-edit-form-input number-input"
                    type="number"
                    name="price"
                    onChange={handleChange}
                    value={inputs.price}
                />
                <select
                    className="book-edit-form-input" name="currency" onChange={handleChange}
                    value={inputs.currency}>
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