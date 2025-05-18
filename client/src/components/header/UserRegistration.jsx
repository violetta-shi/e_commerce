import {Alert, Button, ButtonGroup, Dropdown, FloatingLabel, Form, Modal, Spinner} from "react-bootstrap";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authStateSelector, dismissErrorMessage, login, logout} from "../../store/authSlice";
import {useNavigate} from "react-router-dom";


export default function UserRegistration() 
{
    return 
    (<Modal show={showRegisterModal && !currentUser} onHide={handleClose}>
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
            <h1 className="modal-title fs-5">Регистрация</h1>
        </Modal.Header>
        <Modal.Body>
            {registerErrorMessage && (
                <Alert variant="danger" onClose={handleAlertClose} dismissible>
                    {registerErrorMessage}
                </Alert>
            )}
            <FloatingLabel controlId="register-name" label="Имя" className="mb-3">
                <Form.Control type="text" placeholder="Введите ваше имя" className="form-orange"
                              {...register("name")} />
            </FloatingLabel>
            <FloatingLabel controlId="register-email" label="Email" className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" className="form-orange"
                              {...register("email")} />
            </FloatingLabel>
            <FloatingLabel controlId="register-password" label="Пароль" className="mb-3">
                <Form.Control type="password" placeholder="Введите пароль" className="form-orange"
                              {...register("password")} />
            </FloatingLabel>
            <FloatingLabel controlId="register-confirm-password" label="Подтверждение пароля">
                <Form.Control type="password" placeholder="Подтвердите пароль" className="form-orange"
                              {...register("confirmPassword")} />
            </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
            <Button variant="orange" type="submit" disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : "Зарегистрироваться"}
            </Button>
        </Modal.Footer>
    </Form>
</Modal>
    )

}
