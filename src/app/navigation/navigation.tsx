import { Box, SvgIconTypeMap, Tab, Tabs } from "@mui/material"
import DvrTwoToneIcon from '@mui/icons-material/DvrTwoTone';
import FactCheckTwoToneIcon from '@mui/icons-material/FactCheckTwoTone';
import DnsTwoToneIcon from '@mui/icons-material/DnsTwoTone';
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useMediaQuery } from "react-responsive";
import { MOBILE_BREAKPOINT } from "../common/constants";
import { NavigationItem } from "./navigation-item";

const RouteKey = {
    'exam-simulation': 'exam-simulation',
    'finished-exams': 'finished-exams',
    'questions-answers': 'questions-answers'
} as const
type RouteKey = keyof typeof RouteKey

const tabProps: Record<RouteKey, { icon: JSX.Element, label: string }> = {
    'exam-simulation': { icon: <DvrTwoToneIcon/>, label: "SIMULACIJA ISPITA" },
    'finished-exams': { icon: <FactCheckTwoToneIcon />, label: "RIJEŠENI ISPITI" },
    'questions-answers': { icon: <DnsTwoToneIcon />, label: "PITANJA/ODGOVORI" }
}


export const Navigation = () => {

    const router = useRouter()

    const [selected, setSelected] = useState<RouteKey>('questions-answers');

    const onNavTabClick = (key: RouteKey) => {
      setSelected(key); 
      router.push(`/${RouteKey[key]}`)
    }

    const isDesktopOrLaptop = useMediaQuery({
      query: `(min-width: ${MOBILE_BREAKPOINT}px)`
    })

    return(
      <>
        <Box sx={{ width: "100%", display: 'grid', gridTemplateColumns: '33.33% 33.33% 33.33%' }}>
          <NavigationItem<RouteKey> itemKey='exam-simulation' label='SIMULACIJA ISPITA' icon={<DvrTwoToneIcon/>} onClick={onNavTabClick} selected={selected === 'exam-simulation'}/>
          <NavigationItem<RouteKey> itemKey='finished-exams' label='RIJEŠENI ISPITI' icon={<FactCheckTwoToneIcon/>} onClick={onNavTabClick} selected={selected == 'finished-exams'}/>
          <NavigationItem<RouteKey> itemKey='questions-answers' label='PITANJA/ODGOVORI' icon={<DnsTwoToneIcon/>} onClick={onNavTabClick} selected={selected == 'questions-answers'}/>
        </Box>
      </>
    )
}