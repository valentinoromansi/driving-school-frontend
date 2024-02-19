'use client'

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { DsHeaders } from "../common/api";

export const InfiniteQuestions = () => {

  const { ref, inView } = useInView()


  const { data, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ["QUERY"],
    queryFn: async({ pageParam }) => {
      const url = `http://localhost:8080/api/questions?page=${pageParam}&size=20`
      const response =  await fetch(url)
      const questions = await response.json()
      return questions
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    }, 
  })

  useEffect(() => {
    if(hasNextPage && inView) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  
  return(
    <div style={{ width: '600px', height: '800px', border: '1px solid black', overflow: 'scroll' }}>
      <button onClick={() => { fetchNextPage() }}>LOIAD MORE</button>
      {
        data?.pages.map(d => d.map(item => <p style={{ padding: '10px' }}>{item.id} {item.text}</p>))
      }
       <div ref={ref}></div>
    </div>
  )

}