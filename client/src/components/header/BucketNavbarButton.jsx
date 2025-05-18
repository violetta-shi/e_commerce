import {Button, Card, Modal, Row, Stack} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    addItemToBucket,
    bucketStateSelector,
    countProductsInBucket, removeFromBucket,
    removeItemFromBucket, countBucketPrice, clearBucket, isBucketEmpty
} from "../../store/bucketSlice";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export default function BucketNavbarButton() {
    const { items } = useSelector(bucketStateSelector);
    const [showBucketModal, setShowBucketModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isOrderPage = pathname === "/order";
    const count = countProductsInBucket(items);
    const isEmpty = isBucketEmpty(items);
    const handleShow = () => {
        if (!isOrderPage) {
            setShowBucketModal(true);
        }
    };
    const handleClose = () => setShowBucketModal(false);
    const handleAddItemToBucket = (product) => dispatch(addItemToBucket(product));
    const handleRemoveItemFromBucket = (product) => dispatch(removeItemFromBucket(product));
    const handleRemoveFromBucket = (product) => dispatch(removeFromBucket(product));
    const handleClearBucket = () => dispatch(clearBucket());
    const handleOrder = () => {
        setShowBucketModal(false);
        navigate("/order");
    };
    const calculatePrice = (product, amount) => (product.price * amount).toFixed(2);

    return (
        <>
            <Button variant="link" className="btn-p0 position-relative" onClick={handleShow}>
                <span className="bi-bucket fs-large text-white"></span>
                {count !== 0 && (
                    <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger">
                    {count}
                </span>
                )}
            </Button>

            <Modal show={showBucketModal && !isOrderPage} onHide={handleClose} size="lg" scrollable={true}>
                <Modal.Header closeButton>
                    <h1 className="modal-title fs-5">Корзина</h1>
                </Modal.Header>
                {isEmpty && (
                    <Modal.Body>
                        <h5 className="text-center">Корзина пуста...</h5>
                    </Modal.Body>
                )}
                {!isEmpty && (
                    <>
                        <Modal.Body>
                            {Object.values(items).map(({ product, amount }) => (
                                <Card className="border-0 mb-3" key={product.id}>
                                    <Row className="g-1">
                                        <div className="col-2">
                                            <img src={product.image_url} className="img-fluid rounded-start" alt="..."/>
                                        </div>
                                        <div className="col-10">
                                            <Card.Body className="hstack justify-content-between">
                                                <div>
                                                    <Card.Title as="h5">{product.name}</Card.Title>
                                                    {product.size && (
                                                        <Card.Text className="text-light-dark">{product.size}</Card.Text>
                                                    )}
                                                </div>
                                                <Stack direction="horizontal" className="align-self-baseline">
                                                    <span className="me-3 fs-2">{calculatePrice(product, amount)} руб.</span>
                                                    <Button variant="gray-orange"
                                                            onClick={() => handleRemoveItemFromBucket(product)}>
                                                        <i className="bi-dash-lg"></i>
                                                    </Button>
                                                    <span className="mx-4">{amount}</span>
                                                    <Button variant="gray-orange"
                                                            onClick={() => handleAddItemToBucket(product)}>
                                                        <i className="bi-plus-lg"></i>
                                                    </Button>
                                                    <Button variant="link" className="text-light-dark fs-4 ms-2"
                                                            onClick={() => handleRemoveFromBucket(product)}>
                                                        <i className="bi-trash-fill"></i>
                                                    </Button>
                                                </Stack>
                                            </Card.Body>
                                        </div>
                                    </Row>
                                </Card>
                            ))}
                        </Modal.Body>
                        <Modal.Footer className="justify-content-between">
                            <div>
                                {`Сумма заказа: ${countBucketPrice(items) / 10} руб`}
                            </div>
                            <div>
                                <Button variant="btn-link" className="text-black" onClick={handleClearBucket}>
                                    Очистить корзину
                                </Button>
                                <Button variant="orange" onClick={handleOrder}>
                                    Оформить заказ
                                </Button>
                            </div>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </>
    )
}
