import { BookPreview } from "./bookpreview"

export function BookList({books}) {


    return (
        <div className="book-list">
            {books == null ? <div>Loading...</div> : books.map((book,index) => {
                return (
                    <BookPreview book={book}/>
                )
            })}
        </div>
    )
}