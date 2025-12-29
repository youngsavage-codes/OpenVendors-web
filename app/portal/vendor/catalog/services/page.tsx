'use client'

import AddServiceForm from '@/components/forms/addServiceForm'
import CustomButton from '@/components/shared/button'
import CustomCheckbox from '@/components/shared/checkbox'
import CustomDialog from '@/components/shared/dialog'
import CustomInput from '@/components/shared/input'
import CustomSelect from '@/components/shared/select'
import CustomTextArea from '@/components/shared/textarea'
import { ServicesService } from '@/services/services.service'
import { useEffect, useState } from 'react'

const ServicesPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [step, setStep] = useState('data');

    const handleNext = () => {
        if(step === 'data') {
            setStep('image')
        }
    }

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await ServicesService.getMyServiceApi();
                console.log(res)
            } catch(error: any) {

            }
        }
        fetchServices()
    }, [])

    const handlePrev = () => {
        if(step === 'image') {
            setStep('data')
        }
    }
    return (
        <div>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='font-semibold text-2xl'>Service</h3>
                    <p className="text-lg text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, possimus!</p>
                </div>
                <CustomButton onClick={() => setOpenModal(true)}>
                    Add Service
                </CustomButton>
            </div>

            <div className='my-10'>
                <div className='flex items-center justify-between'>
                    <h3 className='font-semibold text-xl'>All Services</h3>
                    <div className='grid grid-cols-2 gap-3 lg:w-[700px]'>
                        <CustomInput
                            label=""
                            placeholder="Enter service name"
                            className="w-full"
                        />
                        <CustomSelect
                            label=""
                            placeholder="Sort By Categories" 
                            options={[]} 
                        />
                    </div>
                </div>
            </div>

            <CustomDialog 
                open={openModal} 
                onClose={() => setOpenModal(false)} 
                onPrev={handlePrev}
                title={'Add Service'} 
                description={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, possimus!'} 
                closeText='Previous'
                actionText='Add Service'
                onAction={handleNext}
            >
                <AddServiceForm active={step} />
            </CustomDialog>
        </div>
    )
}

export default ServicesPage