import React from 'react'
import CustomCheckbox from '../shared/checkbox'
import CustomInput from '../shared/input'
import CustomSelect from '../shared/select'
import CustomTextArea from '../shared/textarea'

const AddServiceForm = ({active}: any) => {
  return (
    <div>
        {
            active === 'data' ? (
                <div>
                    <CustomInput
                        label="Service Name"
                        placeholder="Enter service name"
                        className="w-full"
                    />
                    <CustomSelect
                        label="Service Category"
                        placeholder="Select Service Category" 
                        options={[]} 
                    />
                    <div className='grid grid-cols-2 gap-3'>
                        <CustomInput
                            label="Service Price"
                            placeholder="Enter service price"
                            type='number'
                            className="w-full"
                        />
                        <CustomInput
                            label="Service Duration (In Hours)"
                            placeholder="Enter service Duration"
                            type='number'
                            className="w-full"
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <CustomInput
                            label="Max Booking Per Day"
                            placeholder="Max daily booking for service"
                            type='number'
                            className="w-full"
                        />
                        <CustomInput
                            label="Advance Booking Days"
                            placeholder="Advanced Booking "
                            className="w-full"
                        />
                    </div>
                    <CustomTextArea 
                        label='Service Description'
                        placeholder='Enter Detailed Description Of Service'
                    />
                    <div>
                        <h2 className='mb-3 block text-[16px] font-medium text-[#0D171A]'>Payment Type</h2>
                        <div className='grid grid-cols-3 pb-5'>
                            <CustomCheckbox
                                id="terms"
                                label="Fixed"
                                checked={true}
                                onCheckedChange={() => {}}
                            />
                            <CustomCheckbox
                                id="terms"
                                label="Hourly"
                                checked={true}
                                onCheckedChange={() => {}}
                            />
                            <CustomCheckbox
                                id="terms"
                                label="Custom"
                                checked={true}
                                onCheckedChange={() => {}}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )
        }  
    </div>
  )
}

export default AddServiceForm