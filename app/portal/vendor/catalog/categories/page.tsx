'use client'
import AddCategoryForm from '@/components/forms/addCategoryForm'
import CustomButton from '@/components/shared/button'
import CustomDialog from '@/components/shared/dialog'
import CustomInput from '@/components/shared/input'
import CustomSelect from '@/components/shared/select'
import React, { useState } from 'react'

const CategoriesPage = () => {
    const [openModal, setOpenModal] = useState(false);
  return (
    <div>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='font-semibold text-2xl'>Service Categories</h3>
                <p className="text-lg text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, possimus!</p>
            </div>
            <CustomButton onClick={() => setOpenModal(true)}>
                Add Category
            </CustomButton>
        </div>

        <div className='my-10'>
            <div className='flex items-center justify-between'>
                <h3 className='font-semibold text-xl'>All Categories</h3>
                <div className='grid grid-cols-2 gap-3 w-[700px]'>
                    <CustomInput
                        label=""
                        placeholder="Enter Category"
                        className="w-full"
                    />
                    <CustomSelect
                        label=""
                        placeholder="Select a category" 
                        options={[]} 
                    />
                </div>
            </div>
        </div>

        <CustomDialog 
            open={openModal} 
            onClose={() => setOpenModal(false)} 
            onPrev={() => setOpenModal(false)}
            title={'Add Category'} 
            description={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, possimus!'} 
            closeText='Close'
            actionText='Add Category'
            onAction={() => {}}
        >
            <AddCategoryForm />
        </CustomDialog>
    </div>
  )
}

export default CategoriesPage