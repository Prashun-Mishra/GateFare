
import { Plane } from "lucide-react"

export function ConcentricCircles() {
    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <defs>
                <clipPath id="halfCircleClip">
                    <rect x="0" y="0" width="1000" height="300" />
                </clipPath>
                <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(5, 150, 105)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.05" />
                </linearGradient>
            </defs>
            <g clipPath="url(#halfCircleClip)">
                <circle cx="500" cy="300" r="140" fill="none" stroke="url(#circleGradient)" strokeWidth="1.5" opacity="0.6" />
                <circle cx="500" cy="300" r="220" fill="none" stroke="url(#circleGradient)" strokeWidth="1.5" opacity="0.5" />
                <circle cx="500" cy="300" r="300" fill="none" stroke="url(#circleGradient)" strokeWidth="1.5" opacity="0.4" />

                <line x1="500" y1="300" x2="500" y2="0" stroke="url(#circleGradient)" strokeWidth="1" opacity="0.2" />
                <line x1="500" y1="300" x2="720" y2="80" stroke="url(#circleGradient)" strokeWidth="1" opacity="0.15" />
                <line x1="500" y1="300" x2="800" y2="150" stroke="url(#circleGradient)" strokeWidth="1" opacity="0.12" />
            </g>

            {/* Planes - Slower animation (30s, 40s, 50s) */}
            <g>
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 500 300"
                    to="360 500 300"
                    dur="30s"
                    repeatCount="indefinite"
                />
                <foreignObject x="484" y="144" width="32" height="32">
                    <div className="text-blue-500 transform -rotate-90"><Plane className="w-8 h-8" /></div>
                </foreignObject>
            </g>

            <g>
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="45 500 300"
                    to="405 500 300"
                    dur="40s"
                    repeatCount="indefinite"
                />
                <foreignObject x="484" y="64" width="32" height="32">
                    <div className="text-blue-500 transform -rotate-90"><Plane className="w-8 h-8" /></div>
                </foreignObject>
            </g>

            <g>
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="90 500 300"
                    to="450 500 300"
                    dur="50s"
                    repeatCount="indefinite"
                />
                <foreignObject x="484" y="-16" width="32" height="32">
                    <div className="text-blue-500 transform -rotate-90"><Plane className="w-8 h-8" /></div>
                </foreignObject>
            </g>
        </svg>
    )
}
