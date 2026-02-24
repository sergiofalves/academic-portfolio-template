"use client";
import * as React from "react";
import { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardMedia, Typography, Stack, Container, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { motion } from "framer-motion";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import projectsData from '@/data/projects.json';
import { customStyles } from '@/app/theme';
import GradientOverlay from "./GradientOverlay";

export function RecentProjects() {
	const itemlist = useMemo(() => {
		return projectsData.filter(p => p.displayInHighlights).slice(0, 3);
	}, []);

	return (
		<Container>
			<Stack
				direction="column"
				spacing={5}
				className="sectionStack"
			>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<Typography
						variant="h4"
						component="h2"
						textAlign="center"
						sx={customStyles.sectionTitle}
					>
						Recent Projects
					</Typography>
				</motion.div>

				<Grid container columnSpacing={4} rowSpacing={4}
					sx={{
						justifyContent: { sm: "center", lg: "center" },
						alignItems: "stretch",
						width: "100%"
					}}
				>
					{itemlist.map((item, index) => (
						<Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								style={{ height: '100%' }}
							>
								<Link href={`/projects/${item.id}`} passHref style={{ textDecoration: 'none', height: '100%', display: 'block' }}>
									<Card
										sx={customStyles.contentCard}
									>
										<Box sx={{ position: 'relative', overflow: 'hidden' }}>
											<CardMedia
												component="img"
												className="card-image"
												sx={{
													height: '180px',
													objectFit: 'cover',
													objectPosition: 'center',
													transition: 'transform 0.4s ease',
												}}
												image={item.images && item.images[0] ? `/projects/${item.id}/images/${item.images[0].name}` : '/images/no-image-icon.png'}
												alt={item.images && item.images[0] ? item.images[0].altText : "Default image"}
											/>
											<GradientOverlay />
										</Box>
										<CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
											<Typography
												variant="h6"
												fontWeight="bold"
												title={item.title}
												sx={customStyles.textClampTitle}
											>
												{item.title}
											</Typography>
											<Typography
												variant="body2"
												sx={customStyles.textClampDescription}
											>
												{item.description}
											</Typography>
										</CardContent>
									</Card>
								</Link>
							</motion.div>
						</Grid>
					))}
				</Grid>

				{/* "See more" link */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<Link href="/projects" passHref style={{ textDecoration: 'none' }}>
						<Stack
							direction="row"
							spacing={0.5}
							alignItems="center"
							sx={customStyles.seeMoreLink}
						>
							<Typography sx={{ fontWeight: 600 }}>
								See all projects
							</Typography>
							<ArrowForwardIcon
								aria-hidden="true"
								className="arrow-icon"
								sx={{
									fontSize: '1.25rem',
									transition: 'transform 0.2s ease',
								}}
							/>
						</Stack>
					</Link>
				</motion.div>
			</Stack>
		</Container>
	);
}