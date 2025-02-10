export interface Book {
  id: string
  title: string
  author: string
  coverUrl: string
}

export const books: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: "/placeholder.svg?height=600&width=450",
  },
  { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", coverUrl: "/placeholder.svg?height=600&width=450" },
  { id: "3", title: "1984", author: "George Orwell", coverUrl: "/placeholder.svg?height=600&width=450" },
  { id: "4", title: "Pride and Prejudice", author: "Jane Austen", coverUrl: "/placeholder.svg?height=600&width=450" },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverUrl: "/placeholder.svg?height=600&width=450",
  },
  { id: "6", title: "The Hobbit", author: "J.R.R. Tolkien", coverUrl: "/placeholder.svg?height=600&width=450" },
]

export function searchBooks(query: string): Book[] {
  const lowercaseQuery = query.toLowerCase()
  return books.filter(
    (book) => book.title.toLowerCase().includes(lowercaseQuery) || book.author.toLowerCase().includes(lowercaseQuery),
  )
}

