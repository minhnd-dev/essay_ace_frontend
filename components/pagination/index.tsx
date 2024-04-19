import React from "react";
import { Button } from "@/components/ui/button"

interface PaginationProps {
  // children: React.ReactNode;
  total: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination(props: PaginationProps) {
  const {total, pageSize, currentPage, setCurrentPage} = props;
  const totalPages = Math.ceil(total / pageSize);

  let pages: string[] = []
  if (totalPages <= 5) {
    pages = Array.from({length: totalPages}, (_, i) => (i + 1).toString());
  } else {
    pages = ["1"]
    if (currentPage - 1 > 1) {
      pages.push("...")
    }
    pages.push(currentPage.toString())
    if (totalPages - currentPage > 1) {
      pages.push("...")
    }
    pages.push(totalPages.toString())
  }

  return (
    <div className="join m-auto">
      {
        pages.map((page, index) => (
          <Button key={index} className={`join-item btn ${currentPage.toString() === page ? "btn-active" : ""}`}
                  onClick={() => setCurrentPage(parseInt(page))}>{page}</Button>
        ))
      }
    </div>
  )
}