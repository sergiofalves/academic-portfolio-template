"use client"
import * as React from 'react';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Stack, Box, IconButton } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SchoolIcon from '@mui/icons-material/School';

import aboutmeData from '@/data/aboutme.json';
import { customStyles } from '@/app/theme';

export function ContactMe() {
	const data = aboutmeData;
	const theme = useTheme();

	const socialIconStyle = {
		background: '#ffffff',
		border: '1px solid rgba(0, 0, 0, 0.08)',
		boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
		color: 'rgba(60, 60, 67, 0.87)',
		transition: 'all 0.2s ease',
		'&:hover': {
			background: '#f8f9fa',
			color: theme.palette.primary.main,
			transform: 'translateY(-3px)',
			boxShadow: '0 4px 12px rgba(0, 122, 255, 0.12)',
		},
	};

	return (
		<Container maxWidth="lg">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<Stack
					direction="column"
					spacing={5}
					className="sectionStack"
				>
					<Typography
						variant="h4"
						component="h2"
						sx={customStyles.sectionTitle}
					>
						Get in Touch
					</Typography>

					<Stack
						direction={{ xs: "column", md: "row" }}
						spacing={{ xs: 4, md: 4 }}
						sx={{
							justifyContent: "center",
							alignItems: { xs: "center", md: "stretch" },
							width: "100%",
						}}
					>
						{/* Google Maps Container */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
							style={{ flex: 1, display: 'flex', width: '100%' }}
						>
							<Box
								sx={{
									width: '100%',
									minHeight: { xs: '250px', md: '280px' },
									borderRadius: '20px',
									overflow: 'hidden',
									border: '1px solid rgba(0, 0, 0, 0.08)',
									boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
									flex: 1,
								}}
							>
								<iframe
									width="100%"
									height="100%"
									loading="lazy"
									title={data.mapsPosition}
									allowFullScreen
									style={{ border: "none", minHeight: '280px' }}
									src={"https://maps.google.com/maps?q=" + data.mapsPosition + "&z=15&output=embed"}
								></iframe>
							</Box>
						</motion.div>

						{/* Address Information Card */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
							style={{ flex: 1, display: 'flex', width: '100%' }}
						>
							<Box
								sx={{
									...customStyles.infoCard,
									border: '1px solid rgba(0, 0, 0, 0.08)',
									textAlign: { xs: "center", md: "left" },
									flex: 1,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
								}}
							>
								{data.adress && (
									<>
										<Typography
											variant="h6"
											fontWeight="bold"
											sx={{ color: 'rgba(0, 0, 0, 0.87)' }}
										>
											{data.adress.split(",")[0]}
										</Typography>
										<Typography
											variant="body1"
											sx={{ color: 'rgba(60, 60, 67, 0.7)', mt: 0.5 }}
										>
											{data.adress.split(",").slice(1).join(",")}
										</Typography>
									</>
								)}

								{data.email && (
									<Typography
										component="a"
										href={`mailto:${data.email}`}
										variant="body1"
										sx={{
											display: 'block',
											mt: 3,
											color: '#007AFF',
											textDecoration: 'none',
											fontWeight: 500,
											transition: 'all 0.2s ease',
											'&:hover': {
												color: '#0056CC',
											},
										}}
									>
										{data.email}
									</Typography>
								)}

								{/* Social Icons */}
								<Stack
									sx={{ mt: 3, justifyContent: { xs: "center", md: "flex-start" } }}
									spacing={1.5}
									direction="row"
									flexWrap="wrap"
								>
									{data.email && (
										<IconButton
											title="Email me"
											component="a"
											href={`mailto:${data.email}`}
											size="medium"
											sx={socialIconStyle}
										>
											<EmailRoundedIcon />
										</IconButton>
									)}

									{data.x && (
										<IconButton
											title="X"
											component="a"
											href={data.x}
											target="_blank"
											size="medium"
											sx={socialIconStyle}
										>
											<XIcon />
										</IconButton>
									)}

									{data.github && (
										<IconButton
											title="GitHub"
											component="a"
											href={data.github}
											target="_blank"
											size="medium"
											sx={socialIconStyle}
										>
											<GitHubIcon />
										</IconButton>
									)}

									{data.linkedin && (
										<IconButton
											title="LinkedIn"
											component="a"
											href={data.linkedin}
											target="_blank"
											size="medium"
											sx={socialIconStyle}
										>
											<LinkedInIcon />
										</IconButton>
									)}

									{data.scholar && (
										<IconButton
											title="Google Scholar"
											component="a"
											href={data.scholar}
											target="_blank"
											size="medium"
											sx={socialIconStyle}
										>
											<SchoolIcon />
										</IconButton>
									)}
								</Stack>
							</Box>
						</motion.div>
					</Stack>
				</Stack>
			</motion.div>
		</Container>
	);
}