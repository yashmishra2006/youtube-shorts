import React from "react"
import { useState, useRef, useEffect } from "react"
import { cn } from "../../lib/utils"

export function ResizableBox({
  children,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 300, height: 200 },
  minWidth = 100,
  minHeight = 100,
  className = "",
  handleClassName = "",
  dragHandleClassName = "",
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [position, setPosition] = useState(defaultPosition)
  const [size, setSize] = useState(defaultSize)
  const [resizeDirection, setResizeDirection] = useState("")
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [startSize, setStartSize] = useState({ width: 0, height: 0 })

  const containerRef = useRef(null)
  const dragStartPos = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e) => {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains("drag-handle") ||
      (dragHandleClassName && e.target.classList.contains(dragHandleClassName.split(" ")[0]))
    ) {
      setIsDragging(true)
      dragStartPos.current = { x: e.clientX - position.x, y: e.clientY - position.y }
    }
  }

  const handleResizeStart = (e, direction) => {
    e.stopPropagation()
    setIsResizing(true)
    setResizeDirection(direction)
    setStartPos({ x: e.clientX, y: e.clientY })
    setStartSize({ width: size.width, height: size.height })
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStartPos.current.x,
          y: e.clientY - dragStartPos.current.y,
        })
      } else if (isResizing) {
        const deltaX = e.clientX - startPos.x
        const deltaY = e.clientY - startPos.y

        if (resizeDirection.includes("e")) {
          setSize((prev) => ({ ...prev, width: Math.max(minWidth, startSize.width + deltaX) }))
        }
        if (resizeDirection.includes("s")) {
          setSize((prev) => ({ ...prev, height: Math.max(minHeight, startSize.height + deltaY) }))
        }
        if (resizeDirection.includes("w")) {
          const newWidth = Math.max(minWidth, startSize.width - deltaX)
          setSize((prev) => ({ ...prev, width: newWidth }))
          setPosition((prev) => ({ ...prev, x: position.x + (startSize.width - newWidth) }))
        }
        if (resizeDirection.includes("n")) {
          const newHeight = Math.max(minHeight, startSize.height - deltaY)
          setSize((prev) => ({ ...prev, height: newHeight }))
          setPosition((prev) => ({ ...prev, y: position.y + (startSize.height - newHeight) }))
        }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isResizing, minHeight, minWidth, position.x, position.y, resizeDirection, startPos, startSize])

  return (
    <div
      ref={containerRef}
      className={cn("absolute bg-white rounded-lg shadow-lg overflow-hidden cursor-move", className)}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="w-full h-full overflow-auto">{children}</div>

      <div
        className={cn("absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-10", handleClassName)}
        onMouseDown={(e) => handleResizeStart(e, "ne")}
      />
      <div
        className={cn("absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-10", handleClassName)}
        onMouseDown={(e) => handleResizeStart(e, "se")}
      />
      <div
        className={cn("absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-10", handleClassName)}
        onMouseDown={(e) => handleResizeStart(e, "sw")}
      />
      <div
        className={cn("absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-10", handleClassName)}
        onMouseDown={(e) => handleResizeStart(e, "nw")}
      />
      <div
        className={cn("absolute top-0 left-1/2 w-4 h-4 -translate-x-1/2 cursor-n-resize z-10", handleClassName)}
        onMouseDown={(e) => handleResizeStart(e, "n")}
      />
      <div
        className={cn("absolute bottom-0 left-1/2 w-4 h-4 -translate-x-1/2 cursor-s-resize z-10", handleClassName)}
        onMouseDown={(e) => handleResizeStart(e, "s")}
      />
      <div
        className={cn("absolute left-0 top-1/2 w-4 h-4 -translate-y-1/2 cursor-w-resize z-10", handleClassName)}
        onMouseDown={(e) => handleResizeStart(e, "w")}
      />
      <div
        className={cn("absolute right-0 top-1/2 w-4 h-4 -translate-y-1/2 cursor-e-resize z-10", handleClassName)}
        onMouseDown={(e) => handleResizeStart(e, "e")}
      />
    </div>
  )
}

export default ResizableBox