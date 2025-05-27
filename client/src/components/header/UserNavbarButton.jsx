import {Alert, Button, ButtonGroup, Dropdown, FloatingLabel, Form, Modal, Spinner} from "react-bootstrap";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authStateSelector, dismissErrorMessage, login, logout, registerUser} from "../../store/authSlice";
import {useNavigate} from "react-router-dom";
import { addNotification } from '../../store/notificationSlice';

export default function UserNavbarButton() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerReg, handleSubmit: handleSubmitReg, formState: { errors: errorsReg }, reset: resetReg } = useForm();

    const { isLoading, isCreating, currentUser, loginErrorMessage, registrationErrorMessage } = useSelector(authStateSelector)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitLogin = data => dispatch(login(data));
    const handleAlertClose = () => dispatch(dismissErrorMessage());

    const handleCloseLogin = () => {
        setShowLoginModal(false);
        handleAlertClose();
    };
    const handleShowLogin = () => setShowLoginModal(true);

    const handleCloseRegistration = () => {
        setShowRegistrationModal(false);
        resetReg(); // Reset registration form on close
        handleAlertClose(); // Dismiss registration error too
    };
    const handleShowRegistration = () => {
        handleCloseLogin(); // Close login modal if open
        setShowRegistrationModal(true);
    };

    const handleLogout = (event) => {
        event.preventDefault();
        handleCloseLogin();
        dispatch(logout());
        navigate('/');
    };

    const onSubmitRegistration = async (data) => {
        const resultAction = await dispatch(registerUser(data));
        if (!registerUser.fulfilled.match(resultAction)) {
            // Registration successful
            dispatch(addNotification({
                background: "text-bg-success",
                title: "Регистрация успешна",
                message: "Теперь вы можете войти используя ваш email и пароль."
            }));
            handleCloseRegistration(); // Close the registration modal
            handleShowLogin(); // Optionally show the login modal
        } else {
            console.error('Registration failed:', resultAction.error);
        }
    };

    const adminLink = (url, text) => {
        if (currentUser?.role === 'ADMIN') {
            return (<Dropdown.Item as="button" onClick={() => navigate(url)}>{text}</Dropdown.Item>);
        }
    }

    return (
        <>
            {currentUser && (
                <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle variant="link" className="btn-p0 fs-large text-white">
                        <span className="bi-person-fill fs-large"></span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item as="button" onClick={() => navigate("/orders")}>Заказы</Dropdown.Item>
                        {adminLink("/product", "Товары")}
                        {adminLink("/category", "Категории")}
                        {adminLink("/dashboard", "Статистика")}
                        {adminLink("/rfm", "RFM анализ")}
                        {adminLink("/web_analytics", "Web аналитика")}
                        <Dropdown.Divider/>
                        <Dropdown.Item as="button" onClick={handleLogout}>Выйти</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )}
            {!currentUser && (
                <Button variant="link" className="btn-p0" onClick={handleShowLogin}>
                    <span className="bi-person fs-large text-white"></span>
                </Button>
            )}

            <Modal show={showLoginModal && !currentUser} onHide={handleCloseLogin}>
                <Form onSubmit={handleSubmit(onSubmitLogin)}>
                    <Modal.Header closeButton>
                        <h1 className="modal-title fs-5">Логин</h1>
                    </Modal.Header>
                    <Modal.Body>
                        {loginErrorMessage && (
                            <Alert variant="danger" onClose={handleAlertClose} dismissible>
                                {loginErrorMessage}
                            </Alert>
                        )}
                        <FloatingLabel controlId="login-email" label="Email" className="mb-3">
                            <Form.Control type="email" placeholder="name@example.com" className="form-orange"
                                          {...register("email", { required: 'Email обязателен' })} isInvalid={!!errors.email}/>
                            <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="login-password" label="Пароль">
                            <Form.Control type="password" placeholder="..." className="form-orange"
                                          {...register("password", { required: 'Пароль обязателен' })} isInvalid={!!errors.password}/>
                             <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleShowRegistration}>Регистрация</Button>
                        <Button variant="orange" type="submit" disabled={isLoading}>
                            {isLoading ? <Spinner animation="border" size="sm" /> : "Войти"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={showRegistrationModal} onHide={handleCloseRegistration}>
                <Form onSubmit={handleSubmitReg(onSubmitRegistration)}>
                    <Modal.Header closeButton>
                        <h1 className="modal-title fs-5">Регистрация</h1>
                    </Modal.Header>
                    <Modal.Body>
                         {registrationErrorMessage && (
                            <Alert variant="danger" onClose={handleAlertClose} dismissible>
                                {registrationErrorMessage}
                            </Alert>
                        )}
                        <FloatingLabel controlId="reg-email" label="Email" className="mb-3">
                            <Form.Control type="email" placeholder="Введите email" className="form-orange" {...registerReg('email', { required: 'Email обязателен' })} isInvalid={!!errorsReg.email} />
                            <Form.Control.Feedback type="invalid">{errorsReg.email?.message}</Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="reg-password" label="Пароль" className="mb-3">
                            <Form.Control type="password" placeholder="Введите пароль" className="form-orange" {...registerReg('password', { required: 'Пароль обязателен' })} isInvalid={!!errorsReg.password} />
                            <Form.Control.Feedback type="invalid">{errorsReg.password?.message}</Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="reg-name" label="Имя" className="mb-3">
                            <Form.Control type="text" placeholder="Введите имя" className="form-orange" {...registerReg('name', { required: 'Имя обязательно' })} isInvalid={!!errorsReg.name} />
                            <Form.Control.Feedback type="invalid">{errorsReg.name?.message}</Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="reg-surname" label="Фамилия" className="mb-3">
                            <Form.Control type="text" placeholder="Введите фамилию" className="form-orange" {...registerReg('surname', { required: 'Фамилия обязательна' })} isInvalid={!!errorsReg.surname} />
                            <Form.Control.Feedback type="invalid">{errorsReg.surname?.message}</Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="reg-phone" label="Телефон" className="mb-3">
                             <Form.Control type="text" placeholder="Введите телефон" className="form-orange" {...registerReg('phone', { required: 'Телефон обязателен' })} isInvalid={!!errorsReg.phone} />
                             <Form.Control.Feedback type="invalid">{errorsReg.phone?.message}</Form.Control.Feedback>
                         </FloatingLabel>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="orange" type="submit" className="w-100" disabled={isCreating}>
                            {isCreating && <Spinner size="sm"/>}
                            {!isCreating && "Зарегистрироваться"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
