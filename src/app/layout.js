import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MyNavbar } from "@/Components/MyNavbar";
import { MyFooter } from "@/Components/MyFooter";
import theme from "../app/theme";
import { ThemeProvider } from '@mui/material/styles';
import { GoogleAnalytics } from '@next/third-parties/google'
import aboutme from "../../data/aboutme.json";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: aboutme.name,
	description: aboutme.description,
};
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<ThemeProvider theme={theme}>
					<MyNavbar />
					<main component="main" id="main-content" tabIndex="-1" style={{ flex: 1 }}>
						{children}
					</main>
					<MyFooter />
				</ThemeProvider>
			</body>
			<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
		</html>
	);
}
