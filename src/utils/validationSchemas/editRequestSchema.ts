import * as Yup from 'yup';
import { requiredStringSchema } from './atoms/requiredStringSchema';

export const editRequestSchema = Yup.object().shape({
    first_name: requiredStringSchema,
    last_name: requiredStringSchema,
    phone: requiredStringSchema,
    dayStart: requiredStringSchema,
    dayEnd: requiredStringSchema,
    timeStart: requiredStringSchema,
    timeEnd: requiredStringSchema,
    email: Yup.string().email('Введите валидный email').max(255)
})