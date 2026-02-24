"use client";
import { useState, useRef, useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import { Box, Stack, Container, Typography, Button, Modal, Backdrop, Fade, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import publicationsData from '@/data/publications.json';
import projectsData from '@/data/projects.json';
import softwareData from '@/data/software.json';

export default function Details() {
	const { id } = useParams();
	const listtype = "publications";

	const item = useMemo(() => {
		return publicationsData.find((pub) => pub.id === id);
	}, [id]);

	const projects = projectsData;
	const software = softwareData;

	const [openFullScreen, setOpenFullScreen] = useState(false);
	const [currentImage, setCurrentImage] = useState('');
	const [currentAltText, setCurrentAltText] = useState('');
	const sliderRef = useRef(null);

	const handleOpenFullScreen = (imageUrl, imageAltText) => {
		setCurrentImage(imageUrl);
		setCurrentAltText(imageAltText);
		setOpenFullScreen(true);
	};

	const handleCloseFullScreen = () => {
		setOpenFullScreen(false);
		setCurrentImage('');
	};

	// If item is not found, show 404
	if (!item) {
		notFound();
	}

	return (
		<Box className="myContent" sx={{ pt: "100px", pb: "100px", overflowY: "hidden", minHeight: "90vh", backgroundColor: "var(--primary-background-color)" }}>
			<Container>
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
					<Typography variant="h4" component="h1" gutterBottom>
						{item.title}
					</Typography>

					{/* Publication Details */}
					<Stack
						direction={{ sm: "column", md: "column" }}
						spacing={7}
						sx={{
							justifyContent: "space-between",
							alignItems: "center",
							width: "100%",
						}}
					>
						<Box sx={{ width: "100%", maxWidth: "400px" }}>
							{item.images.length > 0 ? (
								item.images.length === 1 ? (
									<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
										<img
											src={`/${listtype}/${item.id}/images/${item.images[0].name}`}
											alt={item.images[0].altText}
											role="button"
											tabIndex={0}
											style={{
												width: "100%",
												maxHeight: "300px",
												objectFit: "contain",
												borderRadius: 8,
												cursor: 'pointer'
											}}
											onClick={() => handleOpenFullScreen(`/${listtype}/${item.id}/images/${item.images[0].name}`, item.images[0].altText)}
											onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); handleOpenFullScreen(`/${listtype}/${item.id}/images/${item.images[0].name}`, item.images[0].altText); } }}
										/>
									</Box>
								) : (
									<Slider
										ref={sliderRef}
										dots={true}
										infinite={true}
										speed={500}
										slidesToShow={1}
										slidesToScroll={1}
										adaptiveHeight={true}
										autoplay={true}
										autoplaySpeed={4000}
										pauseOnHover={true}
										pauseOnFocus={true}
										style={{ width: "100%", maxWidth: "400px" }}
									>
										{item.images.map((image, index) => (
											<Box key={index} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
												<img
													src={`/${listtype}/${item.id}/images/${image.name}`}
													alt={image.altText}
													role="button"
													tabIndex={0}
													style={{
														width: "100%",
														maxHeight: "300px",
														objectFit: "contain",
														borderRadius: 8,
														cursor: 'pointer'
													}}
													onClick={() => handleOpenFullScreen(`/${listtype}/${item.id}/images/${image.name}`, image.altText)}
													onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); handleOpenFullScreen(`/${listtype}/${item.id}/images/${image.name}`, image.altText); } }}
												/>
											</Box>
										))}
									</Slider>
								)
							) : (
								<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
									<img
										src={'/images/no-image-icon.png'}
										alt={'default image'}
										style={{
											width: "100%",
											maxHeight: "300px",
											objectFit: "contain",
											borderRadius: 8,
										}}
									/>
								</Box>
							)}
						</Box>

						<Stack sx={{ marginTop: { xs: "40px", sm: "40px", md: "0px" } }} direction="column">
							<Typography
								component="div"
								sx={{
									textAlign: "justify",
									pb: "14px",
									whiteSpace: 'pre-wrap',
								}}
								variant="body1"
								dangerouslySetInnerHTML={{ __html: item.description }}
							/>
							<Typography variant="body1">
								<strong>Authors:</strong> {item.authors.join(", ")}
							</Typography>
							{item.venue && item.venue.length > 0 && (
								<Typography variant="body1">
									<strong>Venue:</strong> {item.venue}
								</Typography>
							)}

							<Stack sx={{ marginTop: 2 }} spacing={2} direction="row">
								<Button sx={{ height: "fit-content", width: "fit-content" }} variant="contained" color="primary" href={`/${listtype}/${item.id}/${item.pdf}`} target="_blank">
									PDF
								</Button>
								{item.externalLinks.length > 0 && (
									<>
										<Stack direction={{ sm: "column", md: "row" }} spacing={2} sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
											{item.externalLinks.map((link, index) => (
												<Button
													key={index}
													variant="contained"
													color="primary"
													href={link.url}
													target="_blank"
													sx={{
														width: "-webkit-fit-content",
														marginBottom: 2,
													}}
												>
													{link.title}
												</Button>
											))}
										</Stack>
									</>
								)}
							</Stack>

							{/* Display related projects */}
							{item.projects && item.projects.length > 0 && (
								<Stack sx={{ marginTop: 2 }} direction="column">
									<Typography variant="body1">
										<strong>Related Projects:</strong>
									</Typography>
									<Stack direction={{ sm: "column", md: "row" }} spacing={2} sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
										{item.projects.map((projectId, index) => {
											const project = projects.find(prj => prj.id === projectId);
											return project ? (
												<Button
													key={index}
													variant="contained"
													color="primary"
													href={`/projects/${project.id}`}
													sx={{
														width: "-webkit-fit-content",
														marginBottom: 2,
													}}
												>
													{project.title}
												</Button>
											) : null;
										})}
									</Stack>
								</Stack>
							)}

							{/* Display related software */}
							{item.software && item.software.length > 0 && (
								<Stack sx={{ marginTop: 2 }} direction="column">
									<Typography variant="body1">
										<strong>Related Software:</strong>
									</Typography>
									<Stack direction={{ sm: "column", md: "row" }} spacing={2} sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
										{item.software.map((softwareId, index) => {
											const softwareItem = software.find(soft => soft.id === softwareId);
											return softwareItem ? (
												<Button
													key={index}
													variant="contained"
													color="primary"
													href={`/software/${softwareItem.id}`}
													sx={{
														width: "-webkit-fit-content",
														marginBottom: 2,
													}}
												>
													{softwareItem.title}
												</Button>
											) : null;
										})}
									</Stack>
								</Stack>
							)}
						</Stack>
					</Stack>
				</Stack>
			</Container>

			<Modal
				aria-labelledby="full-screen-image-modal"
				aria-describedby="full-screen-image-description"
				open={openFullScreen}
				onClose={handleCloseFullScreen}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
				sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<Fade in={openFullScreen}>
					<Box
						sx={{
							outline: 'none',
							position: 'relative',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							bgcolor: 'transparent',
							borderRadius: 2,
							width: 'auto',
							height: 'auto',
							maxWidth: '70vw',
							maxHeight: '70vh',
						}}
					>

						<IconButton
							aria-label="close"
							size="large"
							autoFocus
							onClick={handleCloseFullScreen}
							sx={{
								position: 'absolute',
								top: 8,
								right: 8,
								color: 'white',
								zIndex: 1,
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
								borderRadius: '50%',
								'&:hover': {
									backgroundColor: 'rgba(0, 0, 0, 0.7)',
								},
								boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
							}}
						>
							<CloseIcon />
						</IconButton>

						{currentImage && (
							<img
								src={currentImage}
								alt={currentAltText}
								style={{
									maxWidth: 'inherit',
									maxHeight: 'inherit'
								}}
							/>
						)}
					</Box>
				</Fade>
			</Modal>

		</Box>
	);
}