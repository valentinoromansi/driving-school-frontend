import { Box, Tab, Typography } from "@mui/material"

const staticProps = {
	activeColor: '#2196f3',
	inactiveColor: 'grey'
}

type NavigationItemProps<KeyType extends string> = {
	itemKey: KeyType,
	label: string,
	icon: JSX.Element,
	selected?: boolean,
	onClick: (key: KeyType) => void
}


export const NavigationItem = <KeyType extends string,>(p: NavigationItemProps<KeyType>) => {

	const color = p.selected ? staticProps.activeColor : staticProps.inactiveColor
	
	return(
		<div onClick={() => { p.onClick(p.itemKey) }}>
				<Box sx={{ justifySelf: 'center', width: '100%', cursor: 'pointer' }}>
					{/*
						<Tab sx={{ width: '100%' }} color="red" icon={p.icon} label={p.label} onClick={() => p.onClick(p.itemKey)}/>
						*/		
					}
					<Box sx={{ textAlign: 'center', color: color,  padding: '8px', transition: 'color 1s' }}>
							{p.icon}
						<Typography fontWeight={'500'}>
							{p.label}
						</Typography>
					</Box>
					{
						p.selected &&
						<Box sx={{ background: color, width: '100%', height: '4px' }}></Box>
					}
				</Box>
				</div>
	)
}