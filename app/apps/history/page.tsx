'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {useEffect, useState} from "react";
import fetchWithToken from "@/app/utils/api";
import {Button} from "@/components/ui/button"
import {useRouter} from "next/navigation";

export default function History() {
  const router = useRouter();
  const [topics, setTopics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetchWithToken(
      "http://localhost:5000/topic/list?" + new URLSearchParams({
        limit: "100",
        offset: ((currentPage - 1) * 10).toString(),
      }),
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
          setTopics(data.data);
        }
      )
  }, []);

  function handleClickWritingDetail(topicId) {
    router.push("/apps/writing/" + `${topicId}`)
  }

  return (
    <div className="mt-8 m-auto max-w-[1080px] px-4">
      <p className="text-2xl font-bold">Lịch sử bài làm</p>
      <Accordion type="single" collapsible>
        {topics.map((topic, index) => (
          <AccordionItem value={index+1} key={index}>
            <AccordionTrigger className="text-left">{topic.content}</AccordionTrigger>
            <AccordionContent>
              <div>
                <p>
                  {topic.response}
                </p>
                <Button onClick={(e) => {
                  handleClickWritingDetail(topic.id)
                }}>Xem chi tiết</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#"/>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis/>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#"/>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}