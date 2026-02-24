"use client"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Hero } from "@/Components/Hero";
import { AboutMe } from "@/Components/AboutMe";
import { RecentProjects } from "@/Components/RecentProjects";
import { RecentSoftware } from "@/Components/RecentSoftware";
import { RecentPublications } from "@/app/Components/RecentPublications";
import { ContactMe } from "@/Components/ContactMe";
import React, { useEffect, useMemo } from "react";

export default function Home() {
	const sections = useMemo(() => [
		{ id: "aboutme", component: <AboutMe /> },
		{ id: "projects", component: <RecentProjects /> },
		{ id: "publications", component: <RecentPublications /> },
		{ id: "software", component: <RecentSoftware /> },
		{ id: "contact", component: <ContactMe /> },
	], []);

	// Scroll to section if present
	useEffect(() => {
		const hash = window.location.hash ? window.location.hash.substring(1) : null;
		if (hash) {
			const element = document.getElementById(hash);
			if (element) {
				element.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		}

		// Set up IntersectionObserver to track current section while scrolling
		const observerOptions = {
			root: null,
			rootMargin: "-50% 0px -50% 0px",
			threshold: 0,
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Dispatch custom event when section becomes visible
					window.dispatchEvent(new CustomEvent("sectionChange", { detail: entry.target.id }));
				}
			});
		}, observerOptions);

		// Observe all sections
		sections.forEach((section) => {
			const element = document.getElementById(section.id);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, [sections]);

	return (
		<>
			{/* Hero Section */}
			<Box sx={{ paddingTop: "70px", overflowY: "hidden", position: 'relative', zIndex: 1 }}>
				<Box
					color="white"
					className="myContent"
					sx={{
						position: 'relative',
						background: 'linear-gradient(135deg, rgba(113,124,9,0.78) 0%, rgba(175,134,29,0.9) 50%, rgba(62,209,238,0.8) 100%)',
						minHeight: '10vh',
						display: 'flex',
						alignItems: 'center',
						py: 2,
					}}
				>
					<Box sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
						<Hero />
					</Box>
				</Box>

				{/* Main Content Sections*/}
				<Stack
					sx={{
						"& > .MuiBox-root": {
							minHeight: "35vh",
							paddingBottom: "3%",
							paddingTop: "2%",
						}
					}}
					spacing={0}
				>
					{sections.map((section, index) => (
						<Box
							key={section.id}
							id={section.id}
							className="mySections"
							sx={{
								background: index % 2 === 0
									? '#ffffff'
									: '#f8f9fa',
							}}
						>
							{section.component}
						</Box>
					))}
				</Stack>
			</Box>
		</>
	);
}
