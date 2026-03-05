import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/home';
import { AboutUs } from './pages/about';
import { BookIndex } from './pages/bookindex';
import { BookDetails } from './pages/bookdetails';
import { BookEdit } from './pages/bookedit';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="miss-books-header">
        Miss Books 📚
      </div><div>
        <BrowserRouter>
          {/* Navigation */}
          <nav className="page-navigation">
            <div><Link to="/">Home</Link></div>
            <div><Link to="/about">About</Link></div>
            <div><Link to="/books">Books</Link></div>
          </nav>

          {/* Routes */}
          <div className="page-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/books" element={<BookIndex />} />
              <Route path="/books/edit" element={<BookEdit />} />
              <Route path="/books/edit/:bookid" element={<BookEdit />} />
              <Route path="/books/:bookid" element={<BookDetails />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
