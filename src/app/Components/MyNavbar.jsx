"use client"
import * as React from 'react';
import { useMemo, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Stack } from '@mui/system';
import { useTheme } from "@mui/material/styles";

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SchoolIcon from '@mui/icons-material/School';
import { usePathname } from 'next/navigation';

import aboutmeData from '@/data/aboutme.json';

const skipLinkStyle = {
	position: 'absolute',
	top: -100,
	left: 0,
	zIndex: 9999,
	backgroundColor: 'primary.main',
	color: 'white',
	padding: '10px 20px',
	textDecoration: 'none',
	'&:focus': {
		top: 0,
	},
};

export function MyNavbar() {
	const theme = useTheme();
	const pathname = usePathname();
	const data = aboutmeData;

	const [visibleSection, setVisibleSection] = useState(null);
	const [scrolled, setScrolled] = useState(false);

	const sections = useMemo(() => [
		{ id: "aboutme", label: "About Me" },
		{ id: "projects", label: "Projects" },
		{ id: "publications", label: "Publications" },
		{ id: "software", label: "Software" },
		{ id: "contact", label: "Contact" },
	], []);

	// Listen for sectionChange events from homepage
	useEffect(() => {
		const handleSectionChange = (event) => {
			setVisibleSection(event.detail);
		};

		window.addEventListener("sectionChange", handleSectionChange);
		return () => window.removeEventListener("sectionChange", handleSectionChange);
	}, []);

	// Track scroll for navbar background intensity
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Determine active section: use pathname on detail pages, scroll position on homepage
	const activeSection = useMemo(() => {
		const splited = pathname.split("/");
		if (splited.length > 1 && splited[1]) {
			return splited[1]; // Detail page - use pathname
		}
		return visibleSection; // Homepage - use scroll position
	}, [pathname, visibleSection]);

	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	// Get color for a section from theme
	const getSectionColor = (sectionId) => {
		return theme.palette.sectionColors?.[sectionId] || theme.palette.primary.main;
	};

	// Social icon styles
	const socialIconStyle = {
		color: 'rgba(60, 60, 67, 0.87)',
		transition: 'all 0.2s ease',
		'&:hover': {
			color: theme.palette.primary.main,
			transform: 'translateY(-2px)',
		},
	};

	return (
		<>
			{/* Skip to main content for Accessibility */}
			<Typography
				component="a"
				href="#main-content"
				sx={skipLinkStyle}
			>
				Skip to main content
			</Typography>
			<AppBar
				position="fixed"
				elevation={0}
				sx={{
					background: scrolled
						? 'rgba(255, 255, 255, 0.95)'
						: 'rgba(255, 255, 255, 0.85)',
					backdropFilter: 'blur(10px)',
					WebkitBackdropFilter: 'blur(10px)',
					borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
					boxShadow: scrolled
						? '0 2px 10px rgba(0, 0, 0, 0.06)'
						: 'none',
					transition: 'all 0.3s ease',
				}}
			>
				<Container maxWidth="xl">
					<Toolbar
						disableGutters
						sx={{
							height: '70px',
							minHeight: { xs: '70px', md: '70px' }
						}}
					>
						{/* Logo - Desktop */}
						<Typography
							variant="h5"
							noWrap
							component="a"
							href="/"
							sx={{
								minWidth: "fit-content",
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							{data.website_name}
						</Typography>

						{/* Mobile Menu Button */}
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="navigation menu"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								sx={{
									color: '#1a1a1a',
									pl: 0,
									pr: 0,
									mr: 1.5,
								}}
							>
								<MenuIcon />
							</IconButton>

							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
									'& .MuiPaper-root': {
										background: '#ffffff',
										borderRadius: '16px',
										border: '1px solid rgba(0, 0, 0, 0.06)',
										boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
										mt: 1,
									},
								}}
							>
								{sections.map((section) => (
									<MenuItem
										key={section.id}
										onClick={handleCloseNavMenu}
										sx={{
											borderRadius: '8px',
											mx: 1,
											my: 0.5,
											'&:hover': {
												background: `${getSectionColor(section.id)}15`,
											},
										}}
									>
										<Typography
											component="a"
											href={`/#${section.id}`}
											sx={{
												textAlign: 'center',
												color: activeSection === section.id
													? getSectionColor(section.id)
													: '#1a1a1a',
												fontWeight: activeSection === section.id ? 600 : 400,
												fontSize: '1rem',
												textDecoration: 'none',
											}}
										>
											{section.label}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>

						{/* Logo - Mobile */}
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: 'flex', md: 'none' },
								flexGrow: 1,
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.15rem',
								color: 'inherit',
								textDecoration: 'none',
								minWidth: "fit-content"
							}}
						>
							{data.website_name}
						</Typography>

						{/* Navigation and Social Links */}
						<Stack direction={{ xs: 'row-reverse', md: 'row' }}
							sx={{
								width: "100%",
								justifyContent: "space-between",
								alignItems: "center",
							}}>

							{/* Desktop Navigation */}
							<Box component="nav" aria-label="Main navigation" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
								{sections.map((section) => (
									<Button
										key={section.id}
										href={`/#${section.id}`}
										variant="text"
										sx={{
											my: 2,
											px: 2,
											py: 1,
											display: "block",
											fontSize: '1rem', // Larger font size
											color: activeSection === section.id
												? getSectionColor(section.id)
												: 'rgba(60, 60, 67, 0.87)',
											fontWeight: activeSection === section.id ? 600 : 500,
											borderRadius: '12px',
											position: 'relative',
											transition: 'all 0.2s ease',
											'&::after': {
												content: '""',
												position: 'absolute',
												bottom: '8px',
												left: '50%',
												transform: 'translateX(-50%)',
												width: activeSection === section.id ? '20px' : '0px',
												height: '3px',
												background: getSectionColor(section.id),
												borderRadius: '2px',
												transition: 'width 0.3s ease',
											},
											'&:hover': {
												backgroundColor: `${getSectionColor(section.id)}10`,
												color: getSectionColor(section.id),
											},
											'&:hover::after': {
												width: '20px',
											},
										}}
									>
										{section.label}
									</Button>
								))}
							</Box>

							{/* Social Links */}
							<Box>
								<Stack direction="row" spacing={1.5} justifyContent="center" alignItems="center">
									{data.email && (
										<IconButton
											title="Email me"
											component="a"
											href={`mailto:${data.email}`}
											size="small"
											sx={socialIconStyle}
										>
											<EmailRoundedIcon fontSize="small" />
										</IconButton>
									)}

									{data.x && (
										<IconButton
											title="X"
											component="a"
											href={data.x}
											target="_blank"
											size="small"
											sx={socialIconStyle}
										>
											<XIcon fontSize="small" />
										</IconButton>
									)}

									{data.github && (
										<IconButton
											title="GitHub"
											component="a"
											href={data.github}
											target="_blank"
											size="small"
											sx={socialIconStyle}
										>
											<GitHubIcon fontSize="small" />
										</IconButton>
									)}

									{data.linkedin && (
										<IconButton
											title="LinkedIn"
											component="a"
											href={data.linkedin}
											target="_blank"
											size="small"
											sx={socialIconStyle}
										>
											<LinkedInIcon fontSize="small" />
										</IconButton>
									)}

									{data.scholar && (
										<IconButton
											title="Google Scholar"
											component="a"
											href={data.scholar}
											target="_blank"
											size="small"
											sx={socialIconStyle}
										>
											<SchoolIcon fontSize="small" />
										</IconButton>
									)}
								</Stack>
							</Box>
						</Stack>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
}
