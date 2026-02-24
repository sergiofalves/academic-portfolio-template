"use client"
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	cssVariables: true,
	typography: {
		fontFamily: 'var(--font-geist-sans), sans-serif',
		h1: {
			fontWeight: 700,
			letterSpacing: '-0.02em',
		},
		h2: {
			fontWeight: 700,
			letterSpacing: '-0.02em',
		},
		h3: {
			fontWeight: 600,
			letterSpacing: '-0.01em',
		},
		h4: {
			fontWeight: 600,
			letterSpacing: '-0.01em',
		},
		h5: {
			fontWeight: 600,
		},
		h6: {
			fontWeight: 500,
		},
	},
	shape: {
		borderRadius: 16,
	},
	palette: {
		primary: {
			main: '#007AFF', // Apple Blue
		},
		sectionColors: {
			aboutme: 'rgba(113,124,9,0.9)',    // Olive-green (start of gradient)
			projects: 'rgba(144,129,19,0.9)',  // Olive-golden blend
			publications: 'rgba(175,134,29,0.9)', // Golden/mustard (middle)
			software: 'rgba(118,171,133,0.9)', // Golden-cyan blend
			contact: 'rgba(62,209,238,0.9)',   // Cyan (end of gradient)
		},
		text: {
			primary: 'rgba(0, 0, 0, 0.87)',
			secondary: 'rgba(60, 60, 67, 0.6)',
		},
		background: {
			default: '#ffffff',
			paper: '#ffffff',
		},
		// Link colors
		link: {
			main: '#007AFF',
			hover: '#0056CC',
			visited: '#00A99D',
		},
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					background: 'rgba(255, 255, 255, 0.9)',
					backdropFilter: 'blur(10px)',
					WebkitBackdropFilter: 'blur(10px)',
					borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
					boxShadow: 'none',
					color: 'rgba(0, 0, 0, 0.87)',
				},
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					color: '#007AFF',
					textDecoration: 'none',
					fontWeight: 500,
					transition: 'color 0.2s ease',
					'&:hover': {
						color: '#0056CC',
					},
					'&:visited': {
						color: '#00A99D',
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					background: '#ffffff',
					border: '1px solid rgba(0, 0, 0, 0.08)',
					borderRadius: 20,
					boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
					transition: 'all 0.3s ease',
					'&:hover': {
						transform: 'translateY(-8px) scale(1.02)',
						boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					textTransform: 'none',
					fontWeight: 500,
					transition: 'all 0.2s ease',
				},
				// Card-style buttons - white with subtle border
				contained: {
					background: '#ffffff',
					color: '#1a1a1a',
					border: '1px solid rgba(0, 0, 0, 0.08)',
					boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
					'&:hover': {
						background: '#f8f9fa',
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
						transform: 'translateY(-2px)',
					},
				},
				// Keep outlined style for variety
				outlined: {
					borderColor: 'rgba(0, 0, 0, 0.12)',
					'&:hover': {
						background: 'rgba(0, 0, 0, 0.04)',
						borderColor: 'rgba(0, 0, 0, 0.2)',
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					background: '#ffffff',
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					background: 'rgba(0, 0, 0, 0.04)',
					border: '1px solid rgba(0, 0, 0, 0.08)',
				},
			},
		},
	},
});

// Reusable style objects for common patterns across components
export const customStyles = {
	// Section titles (h4, h2) — used in AboutMe, RecentProjects, RecentPublications, RecentSoftware, ContactMe, [listtype]
	sectionTitle: {
		fontWeight: 600,
		color: '#1a1a1a',
	},

	// Content cards with image + hover effect — used in RecentProjects, RecentPublications, RecentSoftware
	contentCard: {
		height: '100%',
		minHeight: 380,
		display: 'flex',
		flexDirection: 'column',
		background: '#ffffff',
		border: '1px solid rgba(0, 0, 0, 0.08)',
		borderRadius: '20px',
		boxShadow: '0 8px 32px rgba(31, 38, 135, 0.12)',
		overflow: 'hidden',
		transition: 'all 0.3s ease',
		cursor: 'pointer',
		'&:hover': {
			transform: 'translateY(-8px) scale(1.02)',
			boxShadow: '0 20px 40px rgba(31, 38, 135, 0.2)',
			borderColor: 'rgba(255, 255, 255, 0.4)',
			'& .card-image': {
				transform: 'scale(1.05)',
			},
			'& .arrow-icon': {
				transform: 'translateX(4px)',
				opacity: 1,
			},
		},
	},

	// "See all" links with arrow — used in RecentProjects, RecentPublications, RecentSoftware
	seeMoreLink: {
		color: '#007AFF',
		fontWeight: 600,
		fontSize: '1rem',
		transition: 'all 0.2s ease',
		'&:hover': {
			color: '#0056CC',
		},
		'&:hover .arrow-icon': {
			transform: 'translateX(4px)',
		},
	},

	// Text clamp for card titles (2 lines)
	textClampTitle: {
		display: '-webkit-box',
		overflow: 'hidden',
		WebkitBoxOrient: 'vertical',
		WebkitLineClamp: 2,
		lineHeight: '1.3',
		minHeight: '2.6em',
		color: 'rgba(0, 0, 0, 0.87)',
	},

	// Text clamp for card descriptions (5 lines)
	textClampDescription: {
		mt: 1.5,
		display: '-webkit-box',
		overflow: 'hidden',
		WebkitBoxOrient: 'vertical',
		WebkitLineClamp: 5,
		color: 'rgba(60, 60, 67, 0.7)',
		lineHeight: '1.5em',
		flexGrow: 1,
		maxHeight: '7.5em',
	},

	// Info cards (AboutMe bio, ContactMe address) — white card with subtle border/shadow
	infoCard: {
		background: '#ffffff',
		border: '1px solid rgba(0, 0, 0, 0.06)',
		borderRadius: '20px',
		padding: { xs: '24px', md: '32px' },
		boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
	},
};

export default theme;