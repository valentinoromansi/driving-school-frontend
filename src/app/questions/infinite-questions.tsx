'use client'

import { useInfiniteQuery } from "@tanstack/react-query";

export const InfiniteQuestions = () => {
  //const url = `http://localhost:8080/api/questions?page=${pagination.currentPage}&size=${pagination.itemsPerPage}`


  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["QUERY"],
    queryFn: async({ pageParam }) => {
      const url = `http://localhost:8080/api/questions?page=${pageParam}&size=2`
      const response =  await fetch(url)
      const questions = await response.json()
      return questions
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    }
  })

  
  return(
    <div style={{ width: '600px', height: '800px', border: '1px solid black' }}>
      <button onClick={() => { fetchNextPage() }}>LOIAD MORE</button>
      {
        //JSON.stringify(data?.pages)
        data?.pages.map(d => d.map(item => <p style={{ padding: '10px' }}>{item.id} {item.text}</p>))
      }
    </div>
  )

}