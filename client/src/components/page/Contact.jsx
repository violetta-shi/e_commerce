import MainContainer from "../util/MainContainer";
import { Form, Button } from "react-bootstrap";
import React, { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send email)
        console.log('Form submitted:', formData);
        alert('Thank you for your message!');
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <MainContainer>
            <h1 className="text-center mb-4">Свяжитесь с нами</h1>

            <p className="text-center mb-4">Есть вопросы или предложения? Свяжитесь с нами!</p>

            <div className="mb-4">
                <h2>Контактная информация</h2>
                <p>Email: violetta.shishonok@gmail.com</p>
                <p>Телефон: +375 (33) 626-7028</p>
                <p>Адрес: г. Минск, ул. Леонида Беды, 4к1</p>
            </div>

            <div>
                <h2>Отправить нам сообщение</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control type="text" placeholder="Введите ваше имя" name="name" value={formData.name} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Адрес электронной почты</Form.Label>
                        <Form.Control type="email" placeholder="Введите ваш адрес электронной почты" name="email" value={formData.email} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMessage">
                        <Form.Label>Сообщение</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Введите ваше сообщение" name="message" value={formData.message} onChange={handleChange} required />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Отправить
                    </Button>
                </Form>
            </div>
        </MainContainer>
    );
} 