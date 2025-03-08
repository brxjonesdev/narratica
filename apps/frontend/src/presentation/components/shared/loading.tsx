"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface LoadingProps {
  message?: string
  color?: string
}

export default function Loading({ message = "Loading...", color = "primary" }: LoadingProps) {
  const [progress, setProgress] = useState(0)

  // Simulate progress for visual feedback
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Random increment between 5-15 to make it feel more natural
        return Math.min(prev + Math.random() * 10 + 5, 100)
      })
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full min-h-[200px]"
      role="status"
      aria-live="polite"
    >
      {/* Circular loader */}
      <div className="relative w-24 h-24">
        {/* Background circle */}
        <motion.div className={`absolute inset-0 rounded-full border-4 border-muted opacity-30`} />

        {/* Animated progress circle */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <motion.circle
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            className={`text-${color}`}
            cx="50"
            cy="50"
            r="46"
            strokeWidth="8"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            style={{
              rotate: -90,
              transformOrigin: "center",
            }}
          />
        </svg>

        {/* Pulsing dot in the center */}
        <motion.div
          className={`absolute top-1/2 left-1/2 w-4 h-4 -ml-2 -mt-2 bg-${color} rounded-full`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Loading text with typing animation */}
      <div className="mt-6 text-center">
        <motion.div
          className="text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </motion.div>

        {/* Animated dots */}
        <div className="flex justify-center mt-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 mx-1 rounded-full bg-${color}`}
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

