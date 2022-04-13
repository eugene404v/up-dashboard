import * as Yup from 'yup';

export const requiredStringSchema = Yup.string().min(2, 'Мало символов')
    .max(50, 'Много символов').required("Поле обязательно")