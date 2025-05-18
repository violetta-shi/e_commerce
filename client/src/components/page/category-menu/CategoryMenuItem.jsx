import {Button, ButtonGroup, Card, Col, Stack} from "react-bootstrap";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItemToBucket, bucketStateSelector, removeItemFromBucket} from "../../../store/bucketSlice";
import {addToFavorites, favoritesStateSelector, removeFromFavorites} from "../../../store/favoritesSlice";
import {addToCompare, compareStateSelector, removeFromCompare} from "../../../store/compareSlice";

export default function CategoryMenuItem({ products }) {
    const [selectedProduct, setSelectedProduct] = useState(products[products.length - 1]);
    const { items: bucketItems } = useSelector(bucketStateSelector);
    const { items: favoriteItems } = useSelector(favoritesStateSelector);
    const { items: compareItems } = useSelector(compareStateSelector);
    const dispatch = useDispatch();

    const productInBucket = bucketItems[selectedProduct.id];
    const isInFavorites = favoriteItems[selectedProduct.id];
    const isInCompare = compareItems[selectedProduct.id];

    const handleAddToBucket = () => dispatch(addItemToBucket(selectedProduct));
    const handleRemoveFromBucket = () => dispatch(removeItemFromBucket(selectedProduct));
    const handleToggleFavorite = () => {
        if (isInFavorites) {
            dispatch(removeFromFavorites(selectedProduct.id));
        } else {
            dispatch(addToFavorites(selectedProduct));
        }
    };
    const handleToggleCompare = () => {
        if (isInCompare) {
            dispatch(removeFromCompare(selectedProduct.id));
        } else {
            dispatch(addToCompare(selectedProduct));
        }
    };

    return (
        <Col>
            <Card className="border-0 h-100">
                <div className="overflow-hidden position-relative">
                    <Card.Img variant="top" className="scale-transition" src={selectedProduct.image_url}/>
                    <Button 
                        variant="link" 
                        className="position-absolute top-0 start-0 m-2 p-2 bg-white rounded-circle shadow-sm hover-purple" 
                        onClick={handleToggleCompare}
                        style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <span className={`bi-arrow-left-right fs-4 ${isInCompare ? 'text-primary' : 'text-dark'}`}></span>
                    </Button>
                    <Button 
                        variant="link" 
                        className="position-absolute top-0 end-0 m-2 p-2 bg-white rounded-circle shadow-sm hover-purple" 
                        onClick={handleToggleFavorite}
                        style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <span className={`bi-heart${isInFavorites ? '-fill' : ''} fs-4 ${isInFavorites ? 'text-danger' : 'text-dark'}`}></span>
                    </Button>
                </div>
                <Card.Body className="card-y-padding">
                    <Card.Title as="h5" className="fs-4 my-1">{selectedProduct.name}</Card.Title>
                    {products.length > 1 && (
                        <div>
                            <Card.Text className="mb-0">Размер</Card.Text>
                            <ButtonGroup className="w-100 mb-3">
                                {products.map(product => (
                                    <Button variant="outline-orange" onClick={() => setSelectedProduct(product)}
                                            active={product.id === selectedProduct.id} key={product.id}>
                                        {product.size}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </div>
                    )}
                </Card.Body>
                <Stack direction="horizontal" className="justify-content-between">
                    <p className="fs-5">{selectedProduct.price} руб.</p>
                    <p className="text-light-dark">{selectedProduct.weight/1000}кг.</p>
                </Stack>
                {!productInBucket && (
                    <Button variant="outline-orange" className="w-100" onClick={handleAddToBucket}>
                        <span className="bi-bucket"></span> В корзину
                    </Button>
                )}
                {productInBucket && (
                    <Stack direction="horizontal" className="justify-content-between">
                        <p className="mb-0 text-orange">В корзине</p>
                        <div>
                            <Button variant="gray-orange" onClick={handleRemoveFromBucket}>
                                <i className="bi-dash-lg"></i>
                            </Button>
                            <span className="mx-2">{productInBucket.amount}</span>
                            <Button variant="gray-orange" onClick={handleAddToBucket}>
                                <i className="bi-plus-lg"></i>
                            </Button>
                        </div>
                    </Stack>
                )}
            </Card>
        </Col>
    )
}
