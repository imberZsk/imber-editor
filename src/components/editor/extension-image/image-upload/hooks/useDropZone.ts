import { useState, useEffect, useCallback, DragEvent } from 'react'

const useDropZone = ({ uploader }: { uploader: (file: File) => void }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [draggedInside, setDraggedInside] = useState<boolean>(false)

  useEffect(() => {
    const dragStartHandler = () => {
      setIsDragging(true)
    }
    const dragEndHandler = () => {
      setIsDragging(false)
    }
    document.body.addEventListener('dragstart', dragStartHandler)
    document.body.addEventListener('dragend', dragEndHandler)

    // 组件销毁时移除事件监听，否则可能会导致内存泄漏
    return () => {
      document.body.removeEventListener('dragstart', dragStartHandler)
      document.body.removeEventListener('dragend', dragEndHandler)
    }
  }, [])

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      setDraggedInside(false)

      if (e.dataTransfer.files.length === 0) {
        return
      }
      const fileList = e.dataTransfer.files
      const files: File[] = Array.from(fileList)
      const filteredFiles = files.filter((f) => f.type.indexOf('image') !== -1)
      if (filteredFiles.length === 0) {
        return
      }

      e.preventDefault()

      const file = filteredFiles[0]
      if (file) {
        uploader(file) // 上传图片
      }
    },
    [uploader]
  )

  const onDragEnter = () => {
    setDraggedInside(true)
  }

  const onDragLeave = () => {
    setDraggedInside(false)
  }

  return { isDragging, draggedInside, onDragEnter, onDragLeave, onDrop }
}

export default useDropZone
