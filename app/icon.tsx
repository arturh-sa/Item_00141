import {ImageResponse} from "next/og"

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = "image/png"

// Image generation
export default function Icon() {
    return new ImageResponse(
        <div
            style={{
                fontSize: 24,
                background: "white",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0f172a",
                borderRadius: "50%",
                overflow: "hidden",
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M3 6h18"/>
                <path d="M7 12h10"/>
                <path d="M10 18h4"/>
                <path d="M4 3v4"/>
                <path d="M20 3v4"/>
                <path d="M15 3v4"/>
                <path d="M9 3v4"/>
                <circle cx="4" cy="12" r="1"/>
                <circle cx="20" cy="12" r="1"/>
                <circle cx="4" cy="18" r="1"/>
                <circle cx="20" cy="18" r="1"/>
            </svg>
        </div>,
        {
            ...size,
        },
    )
}

