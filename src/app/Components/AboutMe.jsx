"use client";
import * as React from "react";
import { Container, Stack, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import aboutmeData from '@/data/aboutme.json';
import { customStyles } from '@/app/theme';

export function AboutMe() {
	const bio = aboutmeData.bio;

	return (
		<Container maxWidth="lg" sx={{ display: "flex", minHeight: "35vh", justifyContent: "center", alignItems: "center" }}>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				style={{ width: '100%' }}
			>
				<Stack
					direction="column"
					spacing={4}
					className="sectionStack"
				>
					<Typography
						variant="h4"
						component="h2"
						sx={customStyles.sectionTitle}
					>
						About Me
					</Typography>
					{bio && (
						<Box
							sx={{
								...customStyles.infoCard,
								width: '100%',
							}}
						>
							<Box
								component="div"
								sx={{
									textAlign: "justify",
									fontSize: { xs: "1rem", md: "1.1rem" },
									lineHeight: 1.8,
								}}
								dangerouslySetInnerHTML={{ __html: bio }}
							/>
						</Box>
					)}
				</Stack>
			</motion.div>
		</Container>
	);
}