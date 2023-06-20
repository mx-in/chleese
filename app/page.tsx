'use client'
import Image from 'next/image'
import styles from './page.module.css'
import React, { useState, useEffect } from 'react'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [offsetFromCenter, setOffsetFromCenter] = useState({ x: 0, y: 0 })
  const [transform, setTransform] = useState({ x: 0, y: 0, rX: 0, rY: 0 })

  const isInitialOffset = offsetFromCenter.x === 0 && offsetFromCenter.y === 0
  const translationScale = 1 / 20
  const rotationScale = 1 / 100

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event
    setMousePosition({ x: clientX, y: clientY })
    if (!isInitialOffset) {
      const deltaX = clientX - offsetFromCenter.x
      const deltaY = clientY - offsetFromCenter.y

      setTransform({
        x: deltaX * translationScale,
        y: deltaY * translationScale,
        rX: -deltaY * rotationScale,
        rY: deltaX * rotationScale
      })
    }
  }

  useEffect(() => {
    const handleWindowResize = () => {
      const viewportWidth =
        window.innerWidth || document.documentElement.clientWidth
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight
      const centerX = viewportWidth / 2
      const centerY = viewportHeight / 2
      setOffsetFromCenter({ x: centerX, y: centerY })
    }

    if (isInitialOffset) {
      handleWindowResize()
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [mousePosition, isInitialOffset])

  return (
    <div className={styles.container} onMouseMove={handleMouseMove}>
      <div className={styles.background}>
        <Image
          src="https://images.unsplash.com/photo-1583244685026-d8519b5e3d21?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=2400&amp;q=80"
          alt="Description of the image"
          width={10000}
          height={10000}
          style={{ opacity: 1 }}
        />
        <Image
          src="https://images.unsplash.com/photo-1686078607496-d8c2c1c05a5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80"
          alt="Description of the image"
          width={10000}
          height={10000}
          style={{ opacity: 1 }}
        />
        <Image
          src="https://images.unsplash.com/photo-1533050487297-09b450131914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80"
          alt="Description of the image"
          width={10000}
          height={10000}
          style={{ opacity: 1 }}
        />
      </div>
      <main
        className={styles.main}
        style={{
          transform: `translateX(${transform.x}px) translateY(${transform.y}px) translateZ(100px) scale(1) rotateX(${transform.rX}deg) rotateY(${transform.rY}deg)`
        }}
      >
        <div style={{ width: 200, height: 200 }}>
          <p>Mouse X: {mousePosition.x}</p>
          <p>Mouse Y: {mousePosition.y}</p>
          <p>Offset from Center X: {offsetFromCenter.x}</p>
          <p>Offset from Center Y: {offsetFromCenter.y}</p>
        </div>
      </main>
    </div>
  )
}
