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
    const [error, setError] = useState(null);
    const [isValid, setIsValid] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();
        sendFormData(formData);
    };

    const onEmailChange = ({ target }) => {
        setFormData({ ...formData, email: target.value });
    };

    const onEmailBlur = ({ target }) => {
        let newError = null;
        if (
            !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(target.value)
        ) {
            newError = "Упс... Убедитесь в правильности формата почты. Например: qwerty123@qwerty.ru";
        }
        setError(newError);
    };

    const onPasswordChange = ({ target }) => {
        setFormData({ ...formData, password: target.value });
    };

    const onPasswordBlur = ({ target }) => {
        let newError = null;
        if (!/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/.test(target.value)) {
            newError = "Упс... Пароль должен состоять из латинских букв и содержать хотя бы одну заглавную букву и цифру";
        }
        setError(newError);
    };

    const onPasswordConfirmChange = ({ target }) => {
        setFormData({ ...formData, passwordConfirm: target.value });
    };

    const onPasswordConfirmBlur = ({ target }) => {
        let newError = null;
        let validToggle = false;
        if (target.value !== formData.password) {
            newError = 'Упс... Пароли должны совпадать, попробуйте еще раз';
        } else {
            validToggle = true;
        }
        setIsValid(validToggle);
        setError(newError);
    };

    const { email, password, passwordConfirm } = formData;

    return (
        <div className={styles["page-form"]}>
            <h1 className={styles.title}>Регистрация</h1>
            <form className={styles.form} onSubmit={onSubmit}>
                {error && <div className={styles.error}>{error}</div>}
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
