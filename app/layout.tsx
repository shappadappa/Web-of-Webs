import './globals.css'
import { Manrope } from 'next/font/google'
import paths from "./paths.json"

const manrope = Manrope({ subsets: ['latin'] })

export const metadata = {
	title: 'Web of Webs',
	description: 'A website to share websites with others',
}

export default function RootLayout({children}: {children: React.ReactNode}){
    // the function getTotalLength() cannot be used in a server component. Therefore, a function was created to calculate it using 'd' attribute from an svg path (from ChatGPT)

    const calculatePathLength = (pathData: string) =>{
        const segmentRegex = /([MLZ])\s*([^MLZ]*)/gi

        let totalLength = 0, match, lastX = 0, lastY = 0, startX = 0, startY = 0, isPathStarted = false

        while((match = segmentRegex.exec(pathData)) !== null){
            let command = match [1]
            let params = match [2].trim()

            switch(command){
                case 'M':
                    let [moveX, moveY] = parseCoordinates(params)
                    lastX = moveX
                    lastY = moveY
                    startX = moveX
                    startY = moveY
                    isPathStarted = true

                    break
                case 'L':
                    if(isPathStarted){
                        let [endX, endY] = parseCoordinates(params)
                        totalLength += distance(lastX, lastY, endX, endY)
                        lastX = endX
                        lastY = endY
                    }

                    break
                case 'Z':
                    if(isPathStarted){
                        totalLength += distance(lastX, lastY, startX, startY)
                        isPathStarted = false
                    }

                    break
            }
        }

        return totalLength
    }

    const parseCoordinates = (coordString: string) =>{
        let coords = coordString.split(/\s+|,/)
        let x = parseFloat(coords[0])
        let y = parseFloat(coords[1])
        return [x, y]
    }

    const distance = (x1: number, y1: number, x2: number, y2: number) =>{
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    }

    return (
        <html lang="en">
        	<body className={`min-h-full w-full bg-cover bg-no-repeat text-center ${manrope.className}`}>
                <svg className="fixed top-0 left-0 min-w-full min-h-full -z-10 object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
                    <g strokeWidth="1.5" strokeLinejoin="bevel">
                        {paths.map((path, index) =>(
                            <path key={index} strokeDasharray={Math.ceil(calculatePathLength(path.d))} strokeDashoffset={Math.ceil(calculatePathLength(path.d))} className="animate-[draw-line_2s_ease_forwards] fill-white stroke-gray-150" d={path.d} />
                        ))}
                    </g>
                </svg>
                {children}
            </body>
        </html>
    )
}