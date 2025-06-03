"use client"

import { useState } from "react"
import { SearchBar } from "../components/SearchBar"
import { BookGallery } from "../components/BookGallery"
import type { Book } from "../utils/bookData"
import { searchBooks } from "./actions"
// import { Button } from "@/components/ui/button"

export default function Home() {
  const [searchResults, setSearchResults] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [currentQuery, setCurrentQuery] = useState("")
  const [offset, setOffset] = useState(0)

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    setCurrentQuery(query)
    setOffset(0)
    try {
      const { books, hasMore } = await searchBooks(query, 0)
      setSearchResults(books)
      setHasMore(hasMore)
    } catch (error) {
      console.error("Error searching books:", error)
      setSearchResults([])
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-2">Book Cover Search</h1>
      <p className="text-xl text-gray-400 mb-8">Find your next great read</p>
      <SearchBar onSearch={handleSearch} />
      {isLoading && searchResults.length === 0 ? (
        <div className="mt-12">Loading...</div>
      ) : (
        <>
          <div className="mt-12 w-full">
            <BookGallery books={searchResults} />
          </div>
          {/* {hasMore && (
            <Button onClick={handleLoadMore} className="mt-8" disabled={isLoading}>
              {isLoading ? "Loading..." : "Load More"}
            </Button>
          )} */}
        </>
      )}
    </main>
  )
}

