import { SvgIconTypeMap, Tab, Tabs } from "@mui/material"
import DvrTwoToneIcon from '@mui/icons-material/DvrTwoTone';
import FactCheckTwoToneIcon from '@mui/icons-material/FactCheckTwoTone';
import DnsTwoToneIcon from '@mui/icons-material/DnsTwoTone';
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useMediaQuery } from "react-responsive";
import { MOBILE_BREAKPOINT } from "../common/constants";

const RouteKey = {
    'exam-simulation': 'exam-simulation',
    'finished-exams': 'finished-exams',
    'questions-answers': 'questions-answers'
} as const
type RouteKey = keyof typeof RouteKey

const tabProps: Record<RouteKey, { icon: JSX.Element, label: string }> = {
    'exam-simulation': { icon: <DvrTwoToneIcon />, label: "SIMULACIJA ISPITA" },
    'finished-exams': { icon: <FactCheckTwoToneIcon />, label: "RIJEŠENI ISPITI" },
    'questions-answers': { icon: <DnsTwoToneIcon />, label: "PITANJA/ODGOVORI" }
}


export const Navigation = () => {

    const router = useRouter()

    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const isDesktopOrLaptop = useMediaQuery({
      query: `(min-width: ${MOBILE_BREAKPOINT}px)`
    })

    return(
        <Tabs
        centered={!isDesktopOrLaptop}
        sx={{ padding: '6px'}}
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
      >
        <Tab {...tabProps['exam-simulation']} onClick={() => router.push(`/${RouteKey["exam-simulation"]}`)}/>
        <Tab {...tabProps['finished-exams']} onClick={() => router.push(`/${RouteKey["finished-exams"]}`)}/>
        <Tab {...tabProps['questions-answers']} onClick={() => router.push(`/${RouteKey["questions-answers"]}`)} />
      </Tabs>
    )
}