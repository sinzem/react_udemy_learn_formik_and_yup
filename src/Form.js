/* (более упрощенное подключение формы с элементами из формика) */
import { Formik, Form, Field, ErrorMessage, useField} from "formik"; 
import * as Yup from "yup";

const MyTextInput = ({label, ...props}) => { /* (функция вернет участок верстки с лейблом, инпутом и ошибкой - для замены повторяющихся почти одинаковых текстовых инпутов) */
    const [field, meta] = useField(props); /* (хук - получит из формика функции для отправки(value, onChange, onBlur - в обьекте field) и обьект с ошибкой и флажком, что инпут уже использовали(в meta)) */
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field} /> {/* (разворачиваем пропсы, передаем обьект с функциями) */}
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null} 
        </>
    )
}

const MyCheckbox= ({children, ...props}) => { /* (кастомная функция для создания чекбокса - в д.с только усложняет код, но выгодно, если чекбоксов много) */
    const [field, meta] = useField({...props, type: "checkbox"}); 
    return (
        <>
            <label className="checkbox">
                <input type="checkbox" {...props} {...field} />
                {children}
            </label> 
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null} 
        </>
    )
}

const CustomForm = () => { 

    return (
        /* (оборачиваем форму в элемент Formik, начальные состояния, схему валидации и функцию отправки передаем пропсами) */
        <Formik
            initialValues = {{
                name: "",
                email: "",
                amount: 0,
                currency: "",
                text: "",
                terms: ""
            }}
            validationSchema = {Yup.object({ 
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
                        .oneOf([true], "Необходимо согласие") 
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form" /* onSubmit={formik.handleSubmit} */> {/* (подключаем элементы из формика, onSubmit уже вмонтирован) */}
                <h2>Отправить пожертвование</h2>
                {/* ------------------ */}
                {/* <label htmlFor="name">Ваше имя</label>
                <Field
                    id="name"
                    name="name"
                    type="text"
                    {...formik.getFieldProps("name")} 
                /> (вместо инпутов используем Field, функции value(берет из контекста по name - важно, чтобы было проставлено это поле), onChange, onBlur встроены)
                <ErrorMessage className="error" name="name" component="div" /> (элемент для вывода ошибки, подвязываем по имени, указываем, в каком элементе будем выводить(div)) */}
                <MyTextInput label="Ваше имя" id="name" name="name" type="text"/> {/* (заменяем инпут, лейбл и ошибку на кастомный инпут) */}
                {/* ------------------- */}
                {/* <label htmlFor="email">Ваша почта</label>
                <Field
                    id="email"
                    name="email"
                    type="email"
                />
                <ErrorMessage className="error" name="email" component="div" /> */}

                <MyTextInput label="Ваша почта" id="email" name="email" type="email"/>

                <label htmlFor="amount">Количество</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className="error" name="amount" component="div" />
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select"
                    > {/* (вместо select также используем Field, но уточняем с помощью as) */}
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className="error" name="currency" component="div" />
                <label htmlFor="text">Ваше сообщение</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className="error" name="text" component="div" />
                {/* <label className="checkbox">
                    <Field 
                        name="terms" 
                        type="checkbox" 
                    />
                    Соглашаетесь с политикой конфиденциальности?
                </label>
                <ErrorMessage className="error" name="terms" component="div" /> */}
                <MyCheckbox name="terms">
                    Соглашаетесь с политикой конфиденциальности?
                </MyCheckbox>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;