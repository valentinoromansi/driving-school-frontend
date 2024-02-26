'use client'

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { DsHeaders } from "./api";
import axios, { AxiosResponse } from 'axios'
import Skeleton from "react-loading-skeleton";
import useMediaQuery from '@mui/material/useMediaQuery';
import { SxProps } from "@mui/material";
import { Box } from "@mui/system";


type InfiniteQuestionsProps<ResponseDataT> = {
  pageSize: number,
  url: string,
  itemWrapperSx?: SxProps
  itemComponent: (item: ResponseDataT) => JSX.Element
}

export const InfiniteScroll = <ResponseDataT,> ({
  pageSize,
  url,
  itemWrapperSx,
  itemComponent
} : InfiniteQuestionsProps<ResponseDataT>) => {

  const { ref, inView } = useInView()

  const [totalResultCount, setTotalResultCount] = useState<number | null>(null);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ["QUERY"],
    queryFn: async({ pageParam }) => {
      const response = await axios.get<ResponseDataT[]>(url, { params: { page: pageParam - 1,  size: 1 }})
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
    <Box style={{ overflow: 'scroll', height: '100%', boxSizing: 'content-box', marginRight: '-16px'}}>
      <Box sx={{...itemWrapperSx}}>
        {
          data?.pages.map(items => items.map(item => itemComponent?.(item)) )
        }
      </Box>
       <div ref={ref}>
        <Skeleton count={2} highlightColor="gray" height={'100px'}/>
       </div>
    </Box>
  )

}