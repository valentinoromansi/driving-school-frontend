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
  'finished-exams': { icon: <FactCheckTwoToneIcon />, label: "RIJEŠENI ISPITI" },
  'questions-answers': { icon: <DnsTwoToneIcon />, label: "PITANJA/ODGOVORI" },
  'test-page': { icon: <DnsTwoToneIcon />, label: "test-page" }
} satisfies Record<string, {icon: JSX.Element, label: string}>

type RouteKey = keyof typeof tabProps


export const Navigation = () => {

    const router = useRouter()

    const [selected, setSelected] = useState<RouteKey>('questions-answers');

    const onNavTabClick = (key: RouteKey) => {
      setSelected(key); 
      router.push(`/${key}`)
    }

    const tabWidth = `${100/3}%`;

    return(
      <>
        <Box sx={{ width: "100%", display: 'grid', gridTemplateColumns: `${tabWidth} ${tabWidth} ${tabWidth}` }}>
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