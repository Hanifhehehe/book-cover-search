import type { Book } from "../utils/bookData"
import { BookCard } from "./BookCard"

interface BookGalleryProps {
  books: Book[]
}

export function BookGallery({ books }: BookGalleryProps) {
  if (books.length === 0) {
    return <div className="text-center text-gray-400">No books found. Try a different search term.</div>
  }

  console.log(books)

  const sortedBooksTitle = books.sort((a,b) =>
    a.title.localeCompare(b.author)
  )
  const sortedBooksAuthor = sortedBooksTitle.sort((a, b) =>
    a.author.localeCompare(b.author)
  )
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {sortedBooksAuthor.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}