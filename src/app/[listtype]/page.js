"use client";
import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography, Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Container } from "@mui/material";
import Link from "next/link";
import Grid from '@mui/material/Grid2';
import { customStyles } from '@/app/theme';

export default function ContentPage() {
	const { listtype } = useParams(); // Extracts "projects", "software", or "publications" from URL
	const validlisttypes = ["projects", "software", "publications"];
	const menuItems = ["RecentProjects", "RecentSoftware", "RecentPublications"];

	const [items, setItems] = useState([]);

	useEffect(() => {
		const getInfo = async () => {
			const filedata = await fetch("json?filename=" + listtype);
			const json = await filedata.json();
			const processedItems = json.map(item => ({
				...item,
				description: item.description.replace(/<[^>]*>/g, '')
			}));
			setItems(processedItems);
			window.dispatchEvent(new CustomEvent("sectionChange", { detail: menuItems[validlisttypes.indexOf(listtype)] }));
		}
		getInfo();
	}, []);

	return (
		<Box className="myContent" sx={{ pt: "100px", pb: "100px", overflowY: "hidden", minHeight: "90vh", backgroundColor: "#ffffff" }}>
			<Container maxWidth="lg">
				<Stack
					direction="column"
					spacing={7}
					sx={{
						justifyContent: "center",
						alignItems: "center",
						height: "100%",
						width: "100%",
						margin: "auto"
					}}
				>
					<Typography
						variant="h4"
						sx={customStyles.sectionTitle}
					>
						All {listtype.charAt(0).toUpperCase() + listtype.slice(1)}
					</Typography>

					<Grid container columnSpacing={6} rowSpacing={6}
						sx={{
							justifyContent: { sm: "center", md: "space-between" },
							alignItems: "center",
							width: "100%"
						}}
					>
						{items.map((item) => (
							<Link key={item.id} href={`/${listtype}/${item.id}`} passHref style={{ textDecoration: 'none', width: '100%' }}>
								<Card
									sx={{
										width: "100%",
										boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
										borderRadius: '20px',
										border: '1px solid rgba(0, 0, 0, 0.08)',
										height: { xs: "auto", sm: "20vh" },
										minHeight: "190px",
										transition: 'all 0.3s ease',
										'&:hover': {
											transform: 'translateY(-8px) scale(1.02)',
											boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
											borderColor: 'rgba(0, 0, 0, 0.12)',
										},
									}}
								>
									<CardActionArea
										role="link"
										sx={{
											width: "100%",
											height: "100%",
											display: 'flex',
											flexDirection: {
												xs: 'column',
												sm: 'row',
											},
											alignItems: {
												xs: 'center',
												sm: 'flex-start'
											},
										}}
									>
										<CardMedia
											component="img"
											sx={{
												alignSelf: "center",
												width: { xs: '100%', sm: '15vw' },
												minWidth: { xs: 'auto', sm: '150px' },
												maxWidth: { xs: '100%', sm: '400px' },
												height: '100%',
												maxHeight: "20vh",
												objectFit: 'cover',
												objectPosition: 'center',
												borderRadius: '2px',
											}}
											image={item.images && item.images[0] ? `/${listtype}/${item.id}/images/${item.images[0].name}` : '/images/no-image-icon.png'}
											alt={item.images && item.images[0] ? item.images[0].altText : "Default image"}
										/>
										<CardContent
											sx={{
												display: "flex",
												flexDirection: "column",
												justifyContent: "center",
												flex: 1,
												padding: { xs: '16px', sm: '16px' },
											}}
										>
											<Typography
												variant="h6"
												fontWeight="bold"
												sx={{
													...customStyles.textClampTitle,
													lineHeight: '1.25',
													maxWidth: '100%',
												}}
											>
												{item.title}
											</Typography>

											<Typography
												variant="body2"
												color="text.secondary"
												sx={{
													...customStyles.textClampDescription,
													mt: 0,
													maxWidth: '100%',
													paddingTop: '6px',
												}}
											>
												{item.description}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Link>
						))}
					</Grid>
				</Stack>
			</Container>
		</Box>
	);
}
