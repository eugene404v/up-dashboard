import * as Yup from 'yup';

export const requiredNumberSchema = Yup.number().typeError('Поле обязательно').min(0, "Поле обязательно").required("Поле обязательно")