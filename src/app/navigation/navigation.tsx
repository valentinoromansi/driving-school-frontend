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


const tabProps = {
  'exam-simulation': { icon: <DvrTwoToneIcon/>, label: "SIMULACIJA ISPITA" },
  'finished-exams': { icon: <FactCheckTwoToneIcon />, label: "PITANJA/ODGOVORI" },
  'questions-answers': { icon: <DnsTwoToneIcon />, label: "PITANJA/ODGOVORI" }
} satisfies Record<string, {icon: JSX.Element, label: string}>

type RouteKey = keyof typeof tabProps



//type test = keyof typeof tabProps


// const RouteKey = {
//     'exam-simulation': 'exam-simulation',
//     'finished-exams': 'finished-exams',
//     'questions-answers': 'questions-answers'
// } as const
// type RouteKey = keyof typeof RouteKey


export const Navigation = () => {

    const router = useRouter()

    const [selected, setSelected] = useState<RouteKey>('questions-answers');

    for (const [key, value] of Object.entries(tabProps)) {
      console.log(`You have ${value} ${key}`);
    }

    const onNavTabClick = (key: RouteKey) => {
      setSelected(key); 
      router.push(`/${key}`)
    }

    const isDesktopOrLaptop = useMediaQuery({
      query: `(min-width: ${MOBILE_BREAKPOINT}px)`
    })

    return(
      <>
        <Box sx={{ width: "100%", display: 'grid', gridTemplateColumns: '33.33% 33.33% 33.33%' }}>
          {
            (Object.keys(tabProps) as RouteKey[]).map(key => {
              const { icon, label } = tabProps[key];
              return <NavigationItem<RouteKey> itemKey={key} label={label} icon={icon} onClick={onNavTabClick} selected={selected === key}/>
            })
          }
        </Box>
      </>
    )
}