'use client'

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { DsHeaders, getQuestions } from "../api";
import axios, { AxiosResponse } from 'axios'
import Skeleton from "react-loading-skeleton";
import useMediaQuery from '@mui/material/useMediaQuery';
import { SxProps } from "@mui/material";
import { Box } from "@mui/system";
import { Page } from "../../model/Page";


type InfiniteQuestionsProps<ResponseDataT> = {
  pageSize: number,
  //url: string,
  filter?: Object,
  fetchFunction: (page: Page, filter?: any) => Promise<AxiosResponse<ResponseDataT[], any>>,
  itemWrapperSx?: SxProps
  itemComponent: (item: ResponseDataT) => JSX.Element
}

export const InfiniteScroll = <ResponseDataT,> ({
  pageSize,
  filter = {},
  fetchFunction,
  itemWrapperSx,
  itemComponent
} : InfiniteQuestionsProps<ResponseDataT>) => {

  const { ref, inView } = useInView()

  const [totalResultCount, setTotalResultCount] = useState<number | null>(null);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["QUERY", filter],
    queryFn: async({ pageParam }) => {
      const response = await fetchFunction({ page: pageParam - 1,  size: 10 }, filter)
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
  }, [filter]);

  useEffect(() => {
    if(hasNextPage && inView)
      fetchNextPage()
  }, [inView, hasNextPage])

  const initialLoading = totalResultCount === null;

  return(
    <Box style={{ overflow: 'scroll', height: '100%', boxSizing: 'content-box', marginRight: '-16px'}}>
      <Box sx={{...itemWrapperSx}}>
        {
          data?.pages.map(items => items.map(item => itemComponent?.(item)) )
        }
      </Box>
       <div ref={ref}>
        {
          (hasNextPage || initialLoading) &&
          <Skeleton count={2} highlightColor="gray" height={'100px'}/>
        }
       </div>
    </Box>
  )

}