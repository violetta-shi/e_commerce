import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-dark text-light py-5 mt-5">
            <Container>
                <Row className="g-4">
                    {/* Company Info */}
                    <Col md={4}>
                        <h5 className="mb-3">О компании</h5>
                        <p className="text-light-emphasis">
                            Ваш надежный магазин бытовой техники. Мы предлагаем широкий выбор качественной техники от ведущих производителей.
                        </p>
                        <div className="mt-3">
                            <a href="tel:+375291234567" className="text-light text-decoration-none me-3">
                                <i className="bi bi-telephone me-2"></i>+375 (29) 123-45-67
                            </a>
                            <br className="d-md-none" />
                            <a href="mailto:info@example.com" className="text-light text-decoration-none">
                                <i className="bi bi-envelope me-2"></i>info@example.com
                            </a>
                        </div>
                    </Col>

                    {/* Quick Links */}
                    <Col md={4}>
                        <h5 className="mb-3">Быстрые ссылки</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-light text-decoration-none">
                                    <i className="bi bi-house-door me-2"></i>Главная
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/menu" className="text-light text-decoration-none">
                                    <i className="bi bi-grid me-2"></i>Каталог
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/bucket" className="text-light text-decoration-none">
                                    <i className="bi bi-bucket me-2"></i>Корзина
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/favorites" className="text-light text-decoration-none">
                                    <i className="bi bi-heart me-2"></i>Избранное
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    {/* Social Media & Newsletter */}
                    <Col md={4}>
                        <h5 className="mb-3">Мы в соцсетях</h5>
                        <div className="d-flex gap-3 mb-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                                <i className="bi bi-vk"></i>
                            </a>
                            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
                                <i className="bi bi-telegram"></i>
                            </a>
                        </div>
                        <h5 className="mb-3">Режим работы</h5>
                        <p className="text-light-emphasis mb-1">
                            <i className="bi bi-clock me-2"></i>Пн-Пт: 9:00 - 20:00
                        </p>
                        <p className="text-light-emphasis">
                            <i className="bi bi-clock me-2"></i>Сб-Вс: 10:00 - 18:00
                        </p>
                    </Col>
                </Row>

                {/* Copyright */}
                <Row className="mt-4 pt-3 border-top border-secondary">
                    <Col className="text-center text-light-emphasis">
                        <small>&copy; {new Date().getFullYear()} Все права защищены</small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
} 