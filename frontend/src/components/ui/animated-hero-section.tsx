"use client"

import { useEffect, useRef } from "react"

const COLOR = "#FFFFFF"
const HIT_COLOR = "#333333"
const BACKGROUND_COLOR = "#000000"
const BALL_COLOR = "#FFFFFF"
const PADDLE_COLOR = "#FFFFFF"
const LETTER_SPACING = 1
const WORD_SPACING = 3

const PIXEL_MAP = {
    P: [
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
    ],
    R: [
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
        [1, 0, 1, 0],
        [1, 0, 0, 1],
    ],
    O: [
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
    ],
    M: [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
    ],
    T: [
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
    ],
    I: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 1],
    ],
    N: [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 0, 1],
    ],
    G: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
    ],
    S: [
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 1],
        [1, 1, 1, 1],
    ],
    A: [
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
    ],
    L: [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 1, 1],
    ],
    Y: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
    ],
    U: [
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
    ],
    D: [
        [1, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 0],
    ],
    E: [
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 1, 1, 1],
    ],
    H: [
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
    ],
    V: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
    ],
    C: [
        [0, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [0, 1, 1, 1],
    ],
}

interface Pixel {
    x: number
    y: number
    size: number
    hit: boolean
}

interface Ball {
    x: number
    y: number
    dx: number
    dy: number
    radius: number
}

interface Paddle {
    x: number
    y: number
    width: number
    height: number
    targetY: number
    isVertical: boolean
}

export function AnimatedHeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const pixelsRef = useRef<Pixel[]>([])
    const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 })
    const paddlesRef = useRef<Paddle[]>([])
    const scaleRef = useRef(1)

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = container.clientWidth
            canvas.height = container.clientHeight
            scaleRef.current = Math.min(canvas.width / 1000, canvas.height / 1000)
            initializeGame()
        }

        const initializeGame = () => {
            const scale = scaleRef.current
            const LARGE_PIXEL_SIZE = 10 * scale
            const SMALL_PIXEL_SIZE = 5 * scale
            const BALL_SPEED = 5 * scale

            pixelsRef.current = []
            const words = ["THE VACE", "THE ART GALLERY"]

            const calculateWordWidth = (word: string, pixelSize: number) => {
                if (!word) return 0
                return (
                    word.split("").reduce((width, letter) => {
                        if (letter === " ") return width + WORD_SPACING * pixelSize
                        const letterWidth = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]?.[0]?.length ?? 0
                        return width + letterWidth * pixelSize + LETTER_SPACING * pixelSize
                    }, 0) -
                    LETTER_SPACING * pixelSize
                )
            }

            const totalWidthLarge = calculateWordWidth(words[0], LARGE_PIXEL_SIZE)
            const totalWidthSmall = calculateWordWidth(words[1], SMALL_PIXEL_SIZE)

            // Adjust scaling so both lines fit comfortably
            const maxWordWidth = Math.max(totalWidthLarge, totalWidthSmall)
            const scaleFactor = (canvas.width * 0.85) / maxWordWidth

            const adjustedLargePixelSize = LARGE_PIXEL_SIZE * scaleFactor
            const adjustedSmallPixelSize = SMALL_PIXEL_SIZE * scaleFactor

            const largeTextHeight = 5 * adjustedLargePixelSize
            const smallTextHeight = 5 * adjustedSmallPixelSize
            const gap = 8 * adjustedSmallPixelSize
            const totalTextHeight = largeTextHeight + gap + smallTextHeight

            let startY = (canvas.height - totalTextHeight) / 2

            words.forEach((word, wordIndex) => {
                const pixelSize = wordIndex === 0 ? adjustedLargePixelSize : adjustedSmallPixelSize
                const totalWidth = calculateWordWidth(word, pixelSize)
                let startX = (canvas.width - totalWidth) / 2

                word.split("").forEach((letter) => {
                    if (letter === " ") {
                        startX += WORD_SPACING * pixelSize
                        return
                    }
                    const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]
                    if (!pixelMap) return

                    for (let i = 0; i < pixelMap.length; i++) {
                        for (let j = 0; j < pixelMap[i].length; j++) {
                            if (pixelMap[i][j]) {
                                const x = startX + j * pixelSize
                                const y = startY + i * pixelSize
                                pixelsRef.current.push({ x, y, size: pixelSize, hit: false })
                            }
                        }
                    }
                    startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize
                })
                startY += wordIndex === 0 ? largeTextHeight + gap : 0
            })

            // Ball starts at a safe corner
            ballRef.current = {
                x: canvas.width * 0.1,
                y: canvas.height * 0.1,
                dx: BALL_SPEED,
                dy: BALL_SPEED,
                radius: 4 * scale,
            }

            const paddleWidth = 10 * scale
            const paddleLength = 100 * scale

            paddlesRef.current = [
                {
                    x: 0,
                    y: canvas.height / 2 - paddleLength / 2,
                    width: paddleWidth,
                    height: paddleLength,
                    targetY: canvas.height / 2 - paddleLength / 2,
                    isVertical: true,
                },
                {
                    x: canvas.width - paddleWidth,
                    y: canvas.height / 2 - paddleLength / 2,
                    width: paddleWidth,
                    height: paddleLength,
                    targetY: canvas.height / 2 - paddleLength / 2,
                    isVertical: true,
                },
                {
                    x: canvas.width / 2 - paddleLength / 2,
                    y: 0,
                    width: paddleLength,
                    height: paddleWidth,
                    targetY: canvas.width / 2 - paddleLength / 2,
                    isVertical: false,
                },
                {
                    x: canvas.width / 2 - paddleLength / 2,
                    y: canvas.height - paddleWidth,
                    width: paddleLength,
                    height: paddleWidth,
                    targetY: canvas.width / 2 - paddleLength / 2,
                    isVertical: false,
                },
            ]
        }

        const updateGame = () => {
            const ball = ballRef.current
            const paddles = paddlesRef.current

            ball.x += ball.dx
            ball.y += ball.dy

            if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
                ball.dy = -ball.dy
            }
            if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
                ball.dx = -ball.dx
            }

            paddles.forEach((paddle) => {
                if (paddle.isVertical) {
                    if (
                        ball.x - ball.radius < paddle.x + paddle.width &&
                        ball.x + ball.radius > paddle.x &&
                        ball.y > paddle.y &&
                        ball.y < paddle.y + paddle.height
                    ) {
                        ball.dx = -ball.dx
                    }
                } else {
                    if (
                        ball.y - ball.radius < paddle.y + paddle.height &&
                        ball.y + ball.radius > paddle.y &&
                        ball.x > paddle.x &&
                        ball.x < paddle.x + paddle.width
                    ) {
                        ball.dy = -ball.dy
                    }
                }
            })

            paddles.forEach((paddle) => {
                if (paddle.isVertical) {
                    paddle.targetY = ball.y - paddle.height / 2
                    paddle.targetY = Math.max(0, Math.min(canvas.height - paddle.height, paddle.targetY))
                    paddle.y += (paddle.targetY - paddle.y) * 0.1
                } else {
                    paddle.targetY = ball.x - paddle.width / 2
                    paddle.targetY = Math.max(0, Math.min(canvas.width - paddle.width, paddle.targetY))
                    paddle.x += (paddle.targetY - paddle.x) * 0.1
                }
            })

            pixelsRef.current.forEach((pixel) => {
                if (
                    !pixel.hit &&
                    ball.x + ball.radius > pixel.x &&
                    ball.x - ball.radius < pixel.x + pixel.size &&
                    ball.y + ball.radius > pixel.y &&
                    ball.y - ball.radius < pixel.y + pixel.size
                ) {
                    pixel.hit = true
                    const centerX = pixel.x + pixel.size / 2
                    const centerY = pixel.y + pixel.size / 2
                    if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
                        ball.dx = -ball.dx
                    } else {
                        ball.dy = -ball.dy
                    }
                }
            })
        }

        const drawGame = () => {
            if (!ctx) return

            ctx.fillStyle = BACKGROUND_COLOR
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            pixelsRef.current.forEach((pixel) => {
                ctx.fillStyle = pixel.hit ? HIT_COLOR : COLOR
                ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
            })

            ctx.fillStyle = BALL_COLOR
            ctx.beginPath()
            ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2)
            ctx.fill()

            ctx.fillStyle = PADDLE_COLOR
            paddlesRef.current.forEach((paddle) => {
                ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
            })
        }

        const gameLoop = () => {
            updateGame()
            drawGame()
            requestAnimationFrame(gameLoop)
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)
        const animationId = requestAnimationFrame(gameLoop)

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            cancelAnimationFrame(animationId)
        }
    }, [])

    return (
        <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-black">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                aria-label="The Vace Art Gallery Pixel Game"
            />
        </div>
    )
}
