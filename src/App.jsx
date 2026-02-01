import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";

const sendFormData = (data) => {
    console.log(data);
};

const initialState = {
    email: "",
    password: "",
    passwordConfirm: "",
};

function App() {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({
        errorEmail: null,
        errorPassword: null,
        errorPasswordConfirm: null,
    });
    const sendButton = useRef(null);

    const { email, password, passwordConfirm } = formData;

    const isValid =
        Object.values(formData).every((data) => data !== "") &&
        Object.values(errors).every((error) => error === null);

    useEffect(() => {
        if (isValid && sendButton.current) {
            sendButton.current.focus();
        }
    }, [isValid]);

    const onSubmit = (event) => {
        event.preventDefault();
        sendFormData({ email, password });
        setFormData(initialState);
    };

    const onEmailChange = ({ target }) => {
        setFormData({ ...formData, email: target.value });
    };

    const onEmailBlur = ({ target }) => {
        const emailError =
            !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(target.value)
                ? "Упс... Убедитесь в правильности формата почты. Например: qwerty123@qwerty.ru"
                : null;
        setErrors({ ...errors, errorEmail: emailError });
    };

    const isPasswordsCoincidence = () => {
        return password !== passwordConfirm
            ? "Упс... Пароли должны совпадать"
            : null;
    };

    const onPasswordChange = ({ target }) => {
        setFormData({ ...formData, password: target.value });
    };

    const onPasswordBlur = ({ target }) => {
        const passwordError = !/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/.test(
            target.value,
        )
            ? "Упс... Пароль должен состоять из латинских букв и содержать хотя бы одну заглавную букву и цифру"
            : null;
        setErrors({
            ...errors,
            errorPassword: passwordError,
            errorPasswordConfirm: isPasswordsCoincidence(),
        });
    };

    const onPasswordConfirmChange = ({ target }) => {
        setFormData({ ...formData, passwordConfirm: target.value });
    };

    const onPasswordConfirmBlur = () => {
        setErrors({
            ...errors,
            errorPasswordConfirm: isPasswordsCoincidence(),
        });
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
                    ref={sendButton}
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
