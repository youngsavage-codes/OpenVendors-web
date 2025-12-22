import CustomTextArea from '@/components/shared/textarea'
import React from 'react'

const Step2 = () => {
  return (
    <div>
        <CustomTextArea
            label="Add a message (Optional)"
            rows={5}
            placeholder="short paragraph introducing yourself"
        />
    </div>
  )
}

export default Step2