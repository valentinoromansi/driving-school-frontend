'use client'

import Image from "next/image";
import styles from "./question.module.css";
import DsTable, { ColumnDefinition } from "../common/ds-table";
import { Box, Chip, Input, InputLabel, TextField } from "@mui/material";
import { AnswersGroup } from "./answers-group";
import { Question } from "../model/model";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, DsHeaders, HeaderKey } from "../common/api";
import usePagination from "../hook/use-pagination";
import { InfiniteScroll } from "../common/infinite-scroll";
import axios from 'axios'
import MobilePage from "./mobile-page";
import DesktopPage from "./desktop-page";
import MediaQuery from "react-responsive";






export default function Questions() {

  const pagination = usePagination({itemsPerPage: 20})
  
 //const { isLoading, error, data: response, refetch } = useQuery<ApiResponse<Question[]>>({
 //  queryKey: ['QUESTIONS'],
 //  queryFn: async () => {
 //    const url = `http://localhost:8080/api/questions`
 //    const response = await axios.get(url, { params: { page: pagination.currentPage,  size: pagination.itemsPerPage }})
 //    const questions = response.data
 //    const headers = new DsHeaders(response.headers);
 //    const totalItems = headers.getAsNumber('X-Total-Count') 
 //    if(totalItems)
 //      pagination.handleTotalItemsChange(totalItems)
 //    return { questions, headers }
 //  }
 //})
  
  //useEffect(() => {
  //  refetch()
  //}, [pagination.currentPage])

  return (
    <div style={{ padding: '8px', maxWidth: '1280px', height: '100%', margin: 'auto' }}>
      <MediaQuery maxWidth={600}>
        <div style={{ width: '100%' }}>
          <MobilePage/>
        </div>
      </MediaQuery>
      <MediaQuery minWidth={600}>
        <div style={{ width: '100%' }}>
           <DesktopPage/>
        </div>
      </MediaQuery>
      
      
      {
      //  <DsTable<Question>
      //    columnsDefinition={columnsDefinition}
      //    rows={response?.questions || []}
      //    isLoading={isLoading}
      //    pagination={pagination}
      //    />
      //{
      //  JSON.stringify(pagination)
      //}
    }

    </div>
  );
}
