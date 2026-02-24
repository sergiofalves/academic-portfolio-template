"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Stack, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { motion } from "framer-motion";

import aboutmeData from '@/data/aboutme.json';

export function Hero() {
	const data = aboutmeData;
	const theme = useTheme();

	return (
		<Container maxWidth="lg" sx={{
			pb: { xs: "10px", lg: "20px" },
			pt: { xs: "20px", lg: "20px" },
			pr: { xs: "20px", lg: "0px" },
			display: "flex",
			justifyContent: "flex-end",
			alignItems: "center"
		}}>
			<Stack
				direction={{ xs: "column-reverse", lg: "row" }}
				sx={{
					height: "100%",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%",
					textAlign: { xs: "center", lg: "left" },
					gap: { xs: 0, lg: 4 }, // Use gap instead of spacing to avoid margin-left
				}}
			>
				{/* TEXT CONTENT */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					style={{ flex: 1, display: 'flex', alignItems: 'center' }}
				>
					<Stack padding={{ xs: "0em 0em 0em 0em", lg: "0em" }} direction="column" spacing={2}>
						{/* Name - Desktop */}
						<Typography
							sx={{
								display: { xs: 'none', md: 'block' },
								fontWeight: 500,
								letterSpacing: '-0.02em',
								background: 'linear-gradient(135deg, #ffffff 0%, rgba(255. 255, 255, 0.8) 100%)',
								WebkitBackgroundClip: 'text',
								// Keep text white for now on gradient background
							}}
							variant="h2"
							gutterBottom
						>
							{data.name}
						</Typography>

						{/* Name - Mobile */}
						<Typography
							sx={{
								display: { xs: 'block', md: 'none' },
								fontWeight: 500
							}}
							variant="h4"
							component="h2"
							gutterBottom
						>
							{data.name}
						</Typography>

						{/* Positions */}
						<Stack spacing={1}>
							{data.position.map((pos, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
								>
									<Stack
										direction={{ xs: "column", lg: "row" }}
										spacing={1}
										sx={{
											justifyContent: { xs: "center", lg: "flex-start" },
											alignItems: { xs: "center", lg: "flex-start" },
										}}
									>
										<Box sx={{
											display: 'flex',
											alignItems: 'center',
											//background: 'rgba(255, 255, 255, 0.2)',
											//backdropFilter: 'blur(8px)',
											//borderRadius: '8px',
											padding: '4px 8px',
										}}>
											<WorkRoundedIcon
												aria-hidden="true"
												sx={{
													fontSize: '1.25rem',
												}}
											/>
										</Box>
										<Typography sx={{ lineHeight: "1.4em", opacity: 0.95 }} variant="h6">
											{pos.role}, {pos.institution}
										</Typography>
									</Stack>
								</motion.div>
							))}
						</Stack>

						{/* Education */}
						<Stack spacing={1} sx={{ mt: 1 }}>
							{data.education.map((edu, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
								>
									<Stack
										direction={{ xs: "column", lg: "row" }}
										spacing={1}
										sx={{
											justifyContent: { xs: "center", lg: "flex-start" },
											alignItems: { xs: "center", lg: "flex-start" },
										}}
									>
										<Box sx={{
											display: 'flex',
											alignItems: 'center',
											// background: 'rgba(255, 255, 255, 0.2)',
											// backdropFilter: 'blur(8px)',
											// borderRadius: '8px',
											padding: '4px 8px',
										}}>
											<SchoolRoundedIcon
												aria-hidden="true"
												sx={{
													fontSize: '1.25rem',
												}}
											/>
										</Box>
										<Typography sx={{ lineHeight: "1.4em", opacity: 0.95 }} variant="h6">
											{edu.degree}, {edu.year}, {edu.institution}
										</Typography>
									</Stack>
								</motion.div>
							))}
						</Stack>

						{/* Hashtags as Glass Chips */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.6 }}
						>
							<Stack
								direction="row"
								spacing={1}
								flexWrap="wrap"
								useFlexGap
								sx={{
									mt: 2,
									justifyContent: { xs: 'center', lg: 'flex-start' },
								}}
							>
								{data.hashtags.map((tag, index) => (
									<Chip
										key={index}
										label={tag}
										sx={{
											background: 'rgba(0, 0, 0, 0.45)',
											backdropFilter: 'blur(8px)',
											border: '1px solid rgba(255, 255, 255, 0.3)',
											color: 'white',
											cursor: 'default',
											fontWeight: 500,
											fontSize: '0.875rem',
											'&:hover': {
												background: 'rgba(0, 0, 0, 0.55)',
											},
										}}
									/>
								))}
							</Stack>
						</motion.div>
					</Stack>
				</motion.div>

				{/* IMAGE - Desktop */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<Box
						sx={{
							display: { lg: "block", xs: "none" },
							position: 'relative',
						}}
					>
						{/* Glow effect behind image */}
						<Box
							sx={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								width: '220px',
								height: '220px',
								background: `radial-gradient(circle, ${theme.palette.primary.main}40 0%, transparent 70%)`,
								borderRadius: '50%',
								filter: 'blur(20px)',
							}}
						/>
						<Image
							src={"/images/" + data.image}
							style={{
								width: "200px",
								height: "200px",
								objectFit: "cover",
								borderRadius: "50%",
								border: "3px solid rgba(255, 255, 255, 0.5)",
								boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
								position: 'relative',
								zIndex: 1,
							}}
							width={200}
							height={200}
							alt={data.imageAltText}
						/>
					</Box>
				</motion.div>

				{/* IMAGE - Mobile */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<Box
						sx={{
							display: { xs: "block", lg: "none" },
							position: 'relative',
						}}
					>
						{/* Glow effect behind image */}
						<Box
							sx={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								width: '150px',
								height: '150px',
								background: `radial-gradient(circle, ${theme.palette.primary.main}40 0%, transparent 70%)`,
								borderRadius: '50%',
								filter: 'blur(15px)',
							}}
						/>
						<Image
							src={"/images/" + data.image}
							style={{
								width: "130px",
								height: "130px",
								objectFit: "cover",
								borderRadius: "50%",
								border: "3px solid rgba(255, 255, 255, 0.5)",
								boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
								position: 'relative',
								zIndex: 1,
							}}
							width={130}
							height={130}
							alt={data.imageAltText}
						/>
					</Box>
				</motion.div>
			</Stack>
		</Container>
	);
}