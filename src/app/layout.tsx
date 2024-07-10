"use client";

import localFont from "next/font/local";
import "./globals.css";

const vazirMatn = localFont({
	src: "../../fonts/Vazir.woff2",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={vazirMatn.className}>
				<div>{children}</div>
			</body>
		</html>
	);
}
