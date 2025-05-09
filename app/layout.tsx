import type React from "react"
import "@/app/globals.css"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import {ThemeProvider} from "@/components/theme-provider"
import {Toaster} from "sonner"
import Header from "@/components/header"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "Weekly Cleaning Schedule Planner",
    description: "Plan and customize your weekly cleaning tasks",
    icons: {
        icon: [
            {
                url: "/favicon.svg",
                type: "image/svg+xml",
            },
        ],
    },
    generator: 'v0.dev'
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} min-h-screen bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header/>
            {children}
            <Toaster
                position="bottom-right"
                closeButton
                theme="system"
                toastOptions={{
                    className: "bg-background text-foreground border border-border",
                    descriptionClassName: "text-muted-foreground",
                    actionButtonClassName: "bg-primary text-primary-foreground hover:bg-primary/90",
                    cancelButtonClassName: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
                }}
            />
        </ThemeProvider>
        </body>
        </html>
    )
}


import './globals.css'