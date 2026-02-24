"use client";
import { useState, useRef, useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import { Box, Stack, Container, Typography, Button } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import projectsData from '@/data/projects.json';
import publicationsData from '@/data/publications.json';
import softwareData from '@/data/software.json';
import { ImageModal } from "@/app/Components/ImageModal";
import { RelatedItems } from "@/app/Components/RelatedItems";

export default function ProjectDetails() {
    const { id } = useParams();
    const listtype = "projects";

    const item = useMemo(() => {
        return projectsData.find((prj) => prj.id === id);
    }, [id]);

    const publications = publicationsData;
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
        setCurrentAltText('');
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

                    {/* Project Details */}
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
                                            src={`/projects/${item.id}/images/${item.images[0].name}`}
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
                                                    src={`/projects/${item.id}/images/${image.name}`}
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
                                    '& a': {
                                        color: 'link.main',
                                        fontWeight: 500,
                                        '&:hover': {
                                            color: 'link.hover',
                                        },
                                        '&:visited': {
                                            color: 'link.visited',
                                        },
                                    },
                                }}
                                variant="body1"
                                dangerouslySetInnerHTML={{ __html: item.description }}
                            />

                            <Typography variant="body1">
                                <strong>Members:</strong> {item.collaborators.join(", ")}
                            </Typography>

                            <Typography sx={{ marginTop: 2 }} variant="body1">
                                <strong>Period:</strong> {item.startDate} — {item.endDate}
                            </Typography>

                            {/* External Links */}
                            {item.externalLinks.length > 0 && (
                                <>
                                    <Stack direction={{ sm: "column", md: "row" }} spacing={2} sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                                        {item.externalLinks.map((link, index) => (
                                            <Button
                                                key={index}
                                                variant="contained"
                                                color="primary"
                                                href={link.link}
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

                            {/* Related Software */}
                            <RelatedItems title="Related Software" itemIds={item.software} fullList={software} basePath="software" />

                            {/* Related Publications */}
                            <RelatedItems title="Related Publications" itemIds={item.publications} fullList={publications} basePath="publications" />
                        </Stack>
                    </Stack>
                </Stack>
            </Container>

            <ImageModal
                open={openFullScreen}
                onClose={handleCloseFullScreen}
                imageUrl={currentImage}
                altText={currentAltText}
            />
        </Box>
    );
}