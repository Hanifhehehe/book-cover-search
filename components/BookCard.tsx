"use client"

import type { Book } from "../utils/bookData"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(book.coverUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${book.title.replace(/[^a-zA-Z0-9]/g, "_")}_cover.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading image:", error)
    }
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="relative">
        <Image
          src={book.coverUrl || "/placeholder.svg"}
          alt={`Cover of ${book.title}`}
          width={225}
          height={300}
          className="rounded-md mb-4 object-cover"
        />
        <Button onClick={handleDownload} className="absolute bottom-2 right-2 p-2" variant="secondary" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </div>
      <h3 className="text-lg font-semibold text-gray-200 text-center line-clamp-2">{book.title}</h3>
      <p className="text-sm text-gray-400 line-clamp-1">{book.author}</p>
    </div>
  )
}

