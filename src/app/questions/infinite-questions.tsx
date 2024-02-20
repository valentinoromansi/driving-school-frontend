'use client'

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { DsHeaders } from "../common/api";
import axios from 'axios'

export const InfiniteQuestions = () => {

  const { ref, inView } = useInView()

  //const [totalResultCount, setTotalResultCount] = useState<number | null>(null);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ["QUERY"],
    queryFn: async({ pageParam }) => {
      const url = `http://localhost:8080/api/questions`
      const response = await axios.get(url, { params: { page: pageParam,  size: 100 }})
      const headers = new DsHeaders(response.headers);
      //console.log(headers.getAsNumber("X-Total-Count"))
      //setTotalResultCount(headers.getAsNumber("X-Total-Count"))
      return response.data
    },
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      //const hasMore = totalResultCount && (allPages.length * 100 < totalResultCount)
      //console.log(totalResultCount)
      //console.log(allPages.length * 100)
      //console.log(hasMore)
      console.log(allPages.length + 1)
      return allPages.length + 1;
    },
  })

  useEffect(() => {
    if(hasNextPage && inView) {
      //console.log("TOTAL:" + totalResultCount)
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