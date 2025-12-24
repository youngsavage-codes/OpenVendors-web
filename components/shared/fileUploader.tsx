'use client'

import React, { useState, ChangeEvent, DragEvent } from 'react'

interface FileUploaderProps {
  acceptedTypes?: string[] // e.g., ['image/jpeg', 'image/png']
  maxFileSizeMB?: number
  multiple?: boolean
  onFilesChange?: (files: File[]) => void
}

const FileUploader: React.FC<FileUploaderProps> = ({
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  maxFileSizeMB = 5,
  multiple = true,
  onFilesChange,
}) => {
  const [files, setFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const validFiles: File[] = []
    const errorMessages: string[] = []

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]

      // Validate type
      if (!acceptedTypes.includes(file.type)) {
        errorMessages.push(`${file.name} has unsupported file type.`)
        continue
      }

      // Validate size
      if (file.size / 1024 / 1024 > maxFileSizeMB) {
        errorMessages.push(`${file.name} exceeds ${maxFileSizeMB}MB.`)
        continue
      }

      validFiles.push(file)
    }

    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles
    setFiles(updatedFiles)
    setErrors(errorMessages)

    if (onFilesChange) onFilesChange(updatedFiles)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  const removeFile = (index: number) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
    if (onFilesChange) onFilesChange(updatedFiles)
  }

  return (
    <div className="space-y-4 mt-10">
      {/* File Input */}
      <div
        onDrop={onDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        className={`relative cursor-pointer px-4 py-10 border-2 border-dashed rounded-md text-center transition ${
          dragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input
          type="file"
          multiple={multiple}
          accept={acceptedTypes.join(',')}
          onChange={onChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="space-y-2">
          <p className="text-gray-500 font-medium">Drag & drop images here</p>
          <p className="text-gray-400 text-sm">or click to select files</p>
          <p className="text-gray-400 text-xs">
            Max size per file: {maxFileSizeMB}MB
          </p>
        </div>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="text-red-500 text-sm space-y-1">
          {errors.map((err, idx) => (
            <p key={idx}>{err}</p>
          ))}
        </div>
      )}

      {/* Masonry Preview */}
      {files.length > 0 && (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {files.map((file, idx) => {
            const url = URL.createObjectURL(file)
            return (
              <div
                key={idx}
                className="break-inside-avoid relative mb-4 group rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={url}
                  alt={file.name}
                  className="w-full object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-90 hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default FileUploader
