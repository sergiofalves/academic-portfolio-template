"use client";
import { useState, useRef, useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import { Box, Stack, Container, Typography, Button } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import softwareData from '@/data/software.json';
import publicationsData from '@/data/publications.json';
import projectsData from '@/data/projects.json';
import { ImageModal } from "@/app/Components/ImageModal";
import { RelatedItems } from "@/app/Components/RelatedItems";

export default function SoftwareDetails() {
	const { id } = useParams();
	const listtype = "software";

	const item = useMemo(() => {
		return softwareData.find((soft) => soft.id === id);
	}, [id]);

	const publications = publicationsData;
	const projects = projectsData;

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
												cursor: 'pointer',
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
														cursor: 'pointer',
													}}
													onClick={() => handleOpenFullScreen(`/${listtype}/${item.id}/images/${image.name}`, image.altText)}
													onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); handleOpenFullScreen(`/${listtype}/${item.id}/images/${image.name}`, image.altText); } }}
												/>
											</Box>
										))}
									</Slider>
								)
							) : (
								<Typography variant="body1">No image available</Typography>
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

							<Typography textAlign={"justify"} sx={{ pb: "14px" }} variant="body2">
								{item.tags.map((tag, index) => (
									<span key={index}>#{tag}  </span>
								))}
							</Typography>

							<Stack sx={{ marginTop: 2 }} direction="column">
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

							<RelatedItems title="Related Projects" itemIds={item.projects} fullList={projects} basePath="projects" />
							<RelatedItems title="Related Publications" itemIds={item.publications} fullList={publications} basePath="publications" />
						</Stack>
					</Stack>
				</Stack>
				<ImageModal
					open={openFullScreen}
					onClose={handleCloseFullScreen}
					imageUrl={currentImage}
					altText={currentAltText}
				/>
			</Container>
		</Box>
	);
}