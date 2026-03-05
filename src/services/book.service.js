import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'

export const bookService = {
    query,
    get,
    remove,
    save,
    createBook
}

async function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            return books
        })
}

async function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

async function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

async function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

async function createBook(input) {
    await save({
        "title": input.title,
        "authors": [ input.author ],
        "publishedDate": 2025,
        "description": "This is a hard-coded description.",
        "pageCount": 333,
        "categories": [ "Unknown" ],
        "thumbnail": "/assets/bookimages/0.jpg",
        "listPrice": {
            "amount": input.price,
            "currencyCode": input.currency
        }
    })
} 