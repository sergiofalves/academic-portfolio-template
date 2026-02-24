"use client"
import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from '@mui/material';

export function MyFooter() {
	return (
		<Box
			component="footer"
			sx={{
				background: '#f8f9fa',
				borderTop: '1px solid rgba(0, 0, 0, 0.06)',
				padding: "2em",
				width: "100%",
				position: 'relative',
				zIndex: 10,
			}}
		>
			<Stack direction="row" sx={{ justifyContent: "center", alignItems: "center" }}>
				<Typography
					variant="caption"
					sx={{
						color: 'rgba(60, 60, 67, 0.8)',
						fontWeight: 500,
					}}
				>
					Sérgio Alves 2026
				</Typography>
			</Stack>
		</Box>
	);
}