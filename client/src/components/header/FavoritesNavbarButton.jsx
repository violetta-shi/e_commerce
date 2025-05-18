import { Button, Dropdown, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { favoritesStateSelector } from "../../store/favoritesSlice";
import { Link } from "react-router-dom";

export default function FavoritesNavbarButton() {
    const [showFavoritesModal, setShowFavoritesModal] = useState(false);
    const { items } = useSelector(favoritesStateSelector);
    const navigate = useNavigate();

    const handleShow = () => setShowFavoritesModal(true);
    const handleClose = () => setShowFavoritesModal(false);

    // Group favorites by category
    const favoritesByCategory = Object.values(items).reduce((acc, product) => {
        const category = product.category || 'Без категории';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {});

    return (
        <>
            <Button variant="link" className="btn-p0" onClick={handleShow}>
                <span className="bi-heart fs-large text-white"></span>
                {Object.keys(items).length > 0 && (
                    <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger">
                        {Object.keys(items).length}
                    </span>
                )}
            </Button>

            <Modal show={showFavoritesModal} onHide={handleClose} size="lg" scrollable={true}>
                <Modal.Header closeButton>
                    <h1 className="modal-title fs-5">Избранное</h1>
                </Modal.Header>
                <Modal.Body>
                    {Object.keys(favoritesByCategory).length === 0 ? (
                        <h5 className="text-center">В избранном пока ничего нет...</h5>
                    ) : (
                        Object.entries(favoritesByCategory).map(([category, products]) => (
                            <div key={category} className="mb-4">
                                <h5 className="mb-3">{category}</h5>
                                <div className="row row-cols-1 row-cols-md-2 g-4">
                                    {products.map(product => (
                                        <div key={product.id} className="col">
                                            <div className="card h-100">
                                                <img src={product.image_url} className="card-img-top" alt={product.name} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{product.name}</h5>
                                                    <p className="card-text">{product.price} ₽</p>
                                                    <Link to={`/menu/${product.category_id}`} className="btn btn-primary">
                                                        Перейти к товару
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
} 