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
import MobilePage from "../questions-answers/mobile-page";
import DesktopPage from "../questions-answers/desktop-page";
import MediaQuery from "react-responsive";






export default function ExamSimulation() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return ( 
    <div>
      yo
    </div>
  );
}
