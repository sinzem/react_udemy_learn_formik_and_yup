/* (подключение формы с кастомной валидацией или с хуком - чаще используют более сокращенную версию - пример в Form) */
import { useFormik } from "formik"; /* (модуль для работы с формами) */
import * as Yup from "yup";

// const validate = (values) => { /* (кастомная функция для валидации инпутов, формирует обьект с ошибками, если в инпут ввели невалидные данные, на его основебудет выводится сообщение для пользователя, подключаем в хук формика(ниже) - для примера, далее заменяем на yup) */
//     const errors = {};

//     if (!values.name) {
//         errors.name = "Обязательное поле!";
//     } else if (values.name.length < 2) {
//         errors.name = "Минимум 2 символа для заполнения";
//     }

//     if (!values.email) {
//         errors.email = "Обязательное поле!";
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//         errors.email = "Неправильный email адрес";
//     }

//     return errors;
// }

const Form = () => {

    const formik = useFormik({ /* (хук формика) */
        initialValues: { /* (начальные состояния инпутов) */
            name: "",
            email: "",
            amount: 0,
            currency: "",
            text: "",
            terms: ""
        },
        // validate, /* (функция валидации - в д.с кастомная(выше), можно использовать встроенные из формика) */
        validationSchema: Yup.object({ /* (вместо кастомной валидации подключаем схему из Yup(по документации - все подробно расписано, каждое поле валидируем цепочкой функций, вернет обьект errors, подключаем в верстке)) */
            name: Yup.string()
                    .min(2, "Минимум 2 символа!")
                    .required("Обязательное поле!"),
            email: Yup.string()
                    .email("Неправильный email адрес!")
                    .required("Обязательное поле!"),
            amount: Yup.number()
                    .min(5, "Не менее 5")
                    .required("Обязательное поле!"),
            currency: Yup.string().required("Выберите валюту"),
            text: Yup.string()
                    .min(10, "Не менее 10 символов"),
            terms: Yup.boolean()
                    .required("Необходимо согласие!")
                    .oneOf([true], "Необходимо согласие") /* (метод для любого типа(не только boolean), передаем массив возможных вариантов) */
        }),
        onSubmit: values => console.log(JSON.stringify(values, null, 2)) /* (функция отправки данных) */
    }) 

    return (
        <form className="form" onSubmit={formik.handleSubmit}> {/* (подключаем встроенную функцию отправки) */}
            <h2>Отправить пожертвование</h2>
            <label htmlFor="name">Ваше имя</label>
            <input
                id="name"
                name="name"
                type="text"
                // value={formik.values.name}
                // onChange={formik.handleChange} /* (встроенная функция слежения за изменениями в инпуте) */
                // onBlur={formik.handleBlur} /* (встроенная функция слежения за потерей фокуса) */
                {...formik.getFieldProps("name")} /* (заменит предыдущие закомментированные функции) */
            /> 
            {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null} {/* (выдаст ошибку в случае невалидных данных, поле touched отслеживает, было ли уже взаимодействие с инпутом, чтобы не выдавать сообщения на инпутах, в которые еще ничего не вводили) */}
            <label htmlFor="email">Ваша почта</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div> : null}
            <label htmlFor="amount">Количество</label>
            <input
                id="amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.amount && formik.touched.amount ? <div className="error">{formik.errors.amount}</div> : null}
            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
            </select>
            {formik.errors.currency && formik.touched.currency ? <div className="error">{formik.errors.currency}</div> : null}
            <label htmlFor="text">Ваше сообщение</label>
            <textarea 
                id="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <label className="checkbox">
                <input 
                    name="terms" 
                    type="checkbox" 
                    value={formik.values.terms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                Соглашаетесь с политикой конфиденциальности?
            </label>
            {formik.errors.terms && formik.touched.terms ? <div className="error">{formik.errors.terms}</div> : null}
            <button type="submit">Отправить</button>
        </form>
    )
}

export default Form;