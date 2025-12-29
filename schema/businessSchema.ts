import * as Yup from 'yup'

/* ----------------------------------
 STEP 1 – BUSINESS INFO
----------------------------------- */

export const step1Schema = Yup.object({
  businessName: Yup.string()
    .trim()
    .min(3, 'Business name must be at least 3 characters')
    .required('Business name is required'),

  website: Yup.string()
    .transform((value) => {
      if (!value) return ''
      if (!/^https?:\/\//i.test(value)) {
        return `https://${value}`
      }
      return value
    })
    .url('Enter a valid website URL')
    .nullable()
    .notRequired(),

  description: Yup.string()
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .required('Business description is required'),
})

/* ----------------------------------
 STEP 2 – CATEGORIES
----------------------------------- */

export const step2Schema = Yup.object({
  categories: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Please select at least one category')
    .max(4, 'You can select up to 4 categories only')
    .required('Category selection is required'),
})

/* ----------------------------------
 STEP 3 – BUSINESS TYPE
----------------------------------- */

export const step3Schema = Yup.object({
  businessType: Yup.string()
    .oneOf(['independent', 'team'])
    .required('Please select a business type'),
})

/* ----------------------------------
 STEP 4 – TEAM SIZE
----------------------------------- */

export const step4Schema = Yup.object({
  teamSize: Yup.string()
    .oneOf(['2-5', '5-10', '10-20', '20+'])
    .required('Please select your team size'),
})

export type Step4FormValues = Yup.InferType<typeof step4Schema>

/* ----------------------------------
 STEP 5 – SERVICE LOCATION
----------------------------------- */

export const step5Schema = Yup.object({
  serviceLocation: Yup.string()
    .oneOf(['my_location', 'client_location', 'both'])
    .required('Please select how you provide your service'),
})

export type Step5FormValues = Yup.InferType<typeof step5Schema>

/* ----------------------------------
 STEP 7 – IMAGE UPLOAD
----------------------------------- */

export const step7Schema = Yup.object({
  images: Yup.array()
    .of(
      Yup.mixed<File>()
        .required()
        .test(
          'fileType',
          'Only JPG, PNG or WEBP images are allowed',
          (file) =>
            !!file &&
            ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
        )
        .test(
          'fileSize',
          'Each image must be less than 5MB',
          (file) => !!file && file.size <= 5 * 1024 * 1024
        )
    )
    .min(1, 'Please upload at least one image')
    .required('Images are required'),
})

export type Step7FormValues = Yup.InferType<typeof step7Schema>
