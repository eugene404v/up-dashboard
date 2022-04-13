import * as Yup from 'yup';
import { requiredNumberSchema } from './requiredNumberSchema';
import { requiredStringSchema } from './requiredStringSchema';

export const optionalsSchema = Yup.array().of(Yup.object().shape({
    name: requiredStringSchema,
    price: requiredNumberSchema,
    unit: requiredStringSchema
}))