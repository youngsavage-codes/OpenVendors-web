'use client'

import FileUploader from '@/components/shared/fileUploader'
import React, { useState } from 'react'

const Step7 = () => {
  const [images, setImages] = useState<File[]>([])

  return (
    <div className="space-y-6">
      <FileUploader
        multiple
        maxFileSizeMB={5}
        acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
        onFilesChange={setImages}
      />
    </div>
  )
}

export default Step7
