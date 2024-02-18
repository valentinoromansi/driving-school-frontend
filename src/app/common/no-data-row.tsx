import { Box, Typography } from "@mui/material"


export const NoDataRow = () => {
  return(
    <Box sx={{ margin: 0 }}>
      <Typography fontWeight={'bold'} sx={{ margin: 0 }}>NO DATA</Typography>
    </Box>
  )
}