'use client'

import CustomButton from '@/components/shared/button'
import CustomInput from '@/components/shared/input'
import CustomSelect from '@/components/shared/select'


const ProductsPage = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
          <div>
                <h3 className='font-semibold text-2xl'>Your Products</h3>
                <p className="text-lg text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, possimus!</p>
          </div>
          <CustomButton onClick={() => {}}>
            Add Product
          </CustomButton>
      </div>
      <div className='my-10'>
            <div className='flex items-center justify-between'>
                <h3 className='font-semibold text-xl'>All Products</h3>
                <div className='grid grid-cols-2 gap-3 w-[700px]'>
                    <CustomInput
                        label=""
                        placeholder="Enter a product name"
                        className="w-full"
                    />
                    <CustomSelect
                        label=""
                        placeholder="Select a product category" 
                        options={[]} 
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductsPage