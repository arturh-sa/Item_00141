"use client"

import {ModeToggle} from "@/components/mode-toggle"
import {BrushIcon as Broom} from "lucide-react"

export default function Header() {
    return (
        <header className="border-b">
            <div className="container mx-auto py-3 px-4 md:px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Broom className="h-6 w-6"/>
                    <span className="font-semibold text-lg">CleanPlan</span>
                </div>
                <ModeToggle/>
            </div>
        </header>
    )
}

