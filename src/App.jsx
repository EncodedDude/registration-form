import { useState } from "react";
import styles from "./App.module.css";

const sendFormData = (data) => {
    console.log(data);
};

function App() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const [errors, setErrors] = useState({
        errorEmail: null,
        errorPassword: null,
        errorPasswordConfirm: null,
    });

    const { email, password, passwordConfirm } = formData;

    const isValid =
        Object.values(formData).every((data) => data !== "") &&
        Object.values(errors).every((error) => error === null);

    const onSubmit = (event) => {
        event.preventDefault();
        sendFormData({ email, password });
    };

    const onEmailChange = ({ target }) => {
        setFormData({ ...formData, email: target.value });
    };

    const onEmailBlur = ({ target }) => {
        let newError = null;
        if (
            !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(target.value)
        ) {
            newError =
                "Упс... Убедитесь в правильности формата почты. Например: qwerty123@qwerty.ru";
        }
        setErrors({ ...errors, errorEmail: newError });
    };

    const onPasswordChange = ({ target }) => {
        setFormData({ ...formData, password: target.value });
    };

    const onPasswordBlur = ({ target }) => {
        let newError = null;
        if (!/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/.test(target.value)) {
            newError =
                "Упс... Пароль должен состоять из латинских букв и содержать хотя бы одну заглавную букву и цифру";
        }
        setErrors({ ...errors, errorPassword: newError });
    };

    const onPasswordConfirmChange = ({ target }) => {
        setFormData({ ...formData, passwordConfirm: target.value });
    };

    const onPasswordConfirmBlur = ({ target }) => {
        let newError = null;
        if (target.value !== password) {
            newError =
                "Упс... Пароли должны совпадать";
        }
        setErrors({ ...errors, errorPasswordConfirm: newError });
    };

    return (
        <div className={styles["page-form"]}>
            <h1 className={styles.title}>Регистрация</h1>
            <form className={styles.form} onSubmit={onSubmit}>
                {Object.values(errors).some((error) => error !== null) && (
                    <div className={styles.errors}>
                        {Object.values(errors).map((error, index) => (
                            <div className={styles.error} key={index}>
                                {error}
                            </div>
                        ))}
                    </div>
                )}
                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Почта"
                    onChange={onEmailChange}
                    onBlur={onEmailBlur}
                    className={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Пароль"
                    onChange={onPasswordChange}
                    onBlur={onPasswordBlur}
                    className={styles.input}
                />
                <input
                    type="password"
                    name="password-confirm"
                    value={passwordConfirm}
                    placeholder="Подтвердите пароль"
                    onChange={onPasswordConfirmChange}
                    onBlur={onPasswordConfirmBlur}
                    className={styles.input}
                    disabled={!password}
                />
                <button
                    type="submit"
                    className={styles.button}
                    disabled={!isValid}
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
}

export default App;
