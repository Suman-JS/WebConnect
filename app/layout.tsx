import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/provider/modal-provider";
import { SocketProvider } from "@/components/provider/socket-provider";
import { QueryProvider } from "@/components/provider/query-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "WebConnect",
	description:
		"This is a secial media platform that was insipred by Discord, This App was made with NextJS, TailwindCSS, and TypeScript, MySQL, and Socket.io",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html
				lang="en"
				suppressHydrationWarning>
				<body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem={true}
						storageKey="discord-theme">
						<SocketProvider>
							<ModalProvider />
							<QueryProvider>{children}</QueryProvider>
						</SocketProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
