'use client'

import Image from "next/image";
import styles from "./question.module.css";
import DsTable, { ColumnDefinition } from "../common/component/ds-table";
import { Box, Chip, Input, InputLabel, TextField, useMediaQuery, useTheme } from "@mui/material";
import { AnswersGroup } from "../common/component/answers-group";
import { Question } from "../model/model";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, DsHeaders, HeaderKey } from "../common/api";
import usePagination from "../hook/use-pagination";
import { InfiniteScroll } from "../common/component/infinite-scroll";
import axios from 'axios'
import MobilePage from "./mobile-page";
import DesktopPage from "./desktop-page";
import MediaQuery from "react-responsive";
import { MOBILE_BREAKPOINT } from "../common/constants";






export default function QuestionsAnswers() {
  const theme = useTheme();
  
  return ( 
    <div style={{ padding: '8px', maxWidth: '1280px', margin: 'auto' }}>
      <MediaQuery maxWidth={MOBILE_BREAKPOINT}>
        <div style={{ width: '100%' }}>
          <MobilePage/>
        </div>
      </MediaQuery>
      <MediaQuery minWidth={MOBILE_BREAKPOINT}>
        <div style={{ width: '100%' }}>
           <DesktopPage/>
        </div>
      </MediaQuery>
    </div>
  );
}
