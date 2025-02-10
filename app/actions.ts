"use server"

import type { Book } from "../utils/bookData"

export async function searchBooks(query: string, offset = 0): Promise<{ books: Book[]; hasMore: boolean }> {
  const encodedQuery = encodeURIComponent(query)
  const limit = 100
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodedQuery}&country=us&entity=ebook&limit=${limit}&offset=${offset}`,
  )
  const data = await response.json()

  const filteredResults = data.results.filter(
    (item: any) =>
      item.trackName.toLowerCase().includes(query.toLowerCase()) ||
      item.artistName.toLowerCase().includes(query.toLowerCase()),
  )

  const books = filteredResults.map((item: any) => ({
    id: item.trackId.toString(),
    title: item.trackName,
    author: item.artistName,
    coverUrl: item.artworkUrl100.replace("100x100", "450x600"),
  }))

  return {
    books,
    hasMore: offset + limit < data.resultCount,
  }
}

