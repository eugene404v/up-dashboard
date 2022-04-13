import * as Yup from 'yup';
import { requiredNumberSchema } from './atoms/requiredNumberSchema';
import { requiredStringSchema } from './atoms/requiredStringSchema';
import { optionalsSchema } from './atoms/optionalsSchema';

export const addDraftYachtSchema = Yup.object().shape({
    name: requiredStringSchema,
})

export const addYachtSchema = addDraftYachtSchema.shape({
    marina: requiredNumberSchema,
    cost: requiredNumberSchema,
    owner: requiredStringSchema,
    about: Yup.string().min(2, 'Мало символов')
    .max(1000, 'Много символов').required("Поле обязательно"),
    year_built: requiredNumberSchema,
    //passengerCount: requiredNumberSchema,
    toiletCount: requiredNumberSchema,
    showerCount: requiredNumberSchema,
    manufacturer: requiredNumberSchema,
    beam: requiredNumberSchema,
    length: requiredNumberSchema,
    draught: requiredNumberSchema,
    waterTankVolume: requiredNumberSchema,
    engineHP: requiredNumberSchema,
    fuelTankVolume: requiredNumberSchema,
})

export const addYachtInitialValues = {
    extra_expenses: [],
    paid_services: [],
    cabins: {}
}