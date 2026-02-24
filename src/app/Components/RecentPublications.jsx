"use client";
import * as React from "react";
import { useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardMedia, Typography, Stack, Container, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { motion } from "framer-motion";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GradientOverlay from "./GradientOverlay";

import publicationsData from '@/data/publications.json';
import { customStyles } from '@/app/theme';
import { SectionContainer } from "./SectionContainer";
import { SeeMoreLink } from "./SeeMoreLink";

export function RecentPublications() {
	const itemlist = useMemo(() => {
		return publicationsData.filter(p => !p._comment && p.displayInHighlights).slice(0, 3);
	}, []);

	return (
		<SectionContainer title="Fresh Publications">
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
							<Link href={`/publications/${item.id}`} passHref style={{ textDecoration: 'none', height: '100%', display: 'block' }}>
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
											image={item.images && item.images[0] ? `/publications/${item.id}/images/${item.images[0].name}` : '/images/no-image-icon.png'}
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

			<SeeMoreLink href="/publications" text="See all publications" />
		</SectionContainer>
	);
}