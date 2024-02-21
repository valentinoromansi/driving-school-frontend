'use client'

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { DsHeaders } from "../common/api";
import axios, { AxiosResponse } from 'axios'

type InfiniteQuestionsProps<ResponseDataT> = {
  pageSize: number,
  url: string,
  itemComponent: (item: ResponseDataT) => JSX.Element
}

export const InfiniteQuestions = <ResponseDataT,> ({
  pageSize,
  url,
  itemComponent
} : InfiniteQuestionsProps<ResponseDataT>) => {

  const { ref, inView } = useInView()

  const [totalResultCount, setTotalResultCount] = useState<number | null>(null);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ["QUERY"],
    queryFn: async({ pageParam }) => {
      const response = await axios.get<ResponseDataT[]>(url, { params: { page: pageParam - 1,  size: pageSize }})
      const headers = new DsHeaders(response.headers);
      setTotalResultCount(headers.getAsNumber("X-Total-Count"))
      return response.data
    },
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      const hasMore = totalResultCount && (allPages.length * pageSize < totalResultCount)
      return hasMore ? (allPages.length + 1) : undefined;
    },
  })

  useEffect(() => {
    if(hasNextPage && inView)
      fetchNextPage()
  }, [inView, hasNextPage])


  return(
    <div style={{ width: '600px', height: '800px', border: '1px solid black', overflow: 'scroll' }}>
      <button onClick={() => { fetchNextPage() }}>LOIAD MORE</button>
      {
        data?.pages.map( items => 
          items.map(item => itemComponent?.(item))
        )
      }
       <div ref={ref}></div>
    </div>
  )

}