'use client'
import Image from 'next/image'
import styles from './page.module.css'
import React, { useState, useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [offsetFromCenter, setOffsetFromCenter] = useState({ x: 0, y: 0 })
  const [transform, setTransform] = useState({ x: 0, y: 0, rX: 0, rY: 0 })
  const [blurValues, setBlurValues] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])

  const isInitialOffset = offsetFromCenter.x === 0 && offsetFromCenter.y === 0
  const translationScale = 1 / 20
  const rotationScale = 1 / 100
  const blur = 10

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event
    setMousePosition({ x: clientX, y: clientY })
    if (!isInitialOffset) {
      const deltaX = clientX - offsetFromCenter.x
      const deltaY = clientY - offsetFromCenter.y

      setBlurValues([
        Math.max(1, blur + (deltaX * 6) / 47),
        Math.max(1, blur + (deltaX * 4) / 47),
        Math.max(1, blur + (deltaX * 2) / 47),
        Math.max(1, blur + (deltaX * 1) / 47),
        Math.max(1, blur - (deltaX * 1) / 47),
        Math.max(1, blur - (deltaX * 2) / 47),
        Math.max(1, blur - (deltaX * 4) / 47),
        Math.max(1, blur - (deltaX * 6) / 47)
      ])

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
          src="https://images.unsplash.com/photo-1541320518190-df77c3ff7ca5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2304&q=80"
          alt="Description of the image"
          width={10000}
          height={10000}
          style={{ opacity: 1 }}
        />
        <Image
          src="https://images.unsplash.com/photo-1687322595779-49f6172ed32c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
          alt="Description of the image"
          width={10000}
          height={10000}
          style={{ opacity: 1 }}
        />
        <Image
          src="https://images.unsplash.com/photo-1687322594575-ef5a88b6de21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80"
          alt="Description of the image"
          width={10000}
          height={10000}
          style={{ opacity: 1 }}
        />
        <Image
          src="https://images.unsplash.com/photo-1687322594953-caa0ad8c5423?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80"
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
        {blurValues.map((value, index) => (
          <span
            key={index}
            className={styles.bs}
            style={{ '--blur': `${value}px` } as React.CSSProperties}
          />
        ))}
        <div className={styles.greeting}>
          <div
            style={{
              marginBottom: '10px'
            }}
          >
            {' '}
            Happy Birthday Yuan Yuan 🎈
          </div>
          <TypeAnimation
            sequence={[
              'I hope you be beautiful',
              1000,
              'I hope you be happy',
              1000,
              'I hope you be healthy',
              1000,
              'I hope you be the one you want to be',
              1000
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '1.8em', display: 'inline-block' }}
            repeat={Infinity}
          />
        </div>
      </main>
    </div>
  )
}
