import { useDispatch, useSelector } from 'react-redux';
import { compareStateSelector } from '../../store/compareSlice';
import MainContainer from '../util/MainContainer';
import { Button, Row, Table } from 'react-bootstrap';
import { removeFromCompare } from '../../store/compareSlice';
import { Link } from 'react-router-dom';

export default function AppCompare() {
    const { items: compareItems } = useSelector(compareStateSelector);
    const dispatch = useDispatch();

    const handleRemoveFromCompare = (productId) => {
        dispatch(removeFromCompare(productId));
    };

    if (Object.keys(compareItems).length === 0) {
        return (
            <MainContainer>
                <div className="text-center py-5">
                    <h3>Список сравнения пуст</h3>
                    <p className="text-muted">Добавьте товары для сравнения из каталога</p>
                    <Link to="/menu">
                        <Button variant="outline-orange">Перейти в каталог</Button>
                    </Link>
                </div>
            </MainContainer>
        );
    }

    const products = Object.values(compareItems);
    const attributes = ['name', 'price', 'size', 'weight'];

    return (
        <MainContainer>
            <h2 className="text-center mb-4">Сравнение товаров</h2>
            <div className="table-responsive">
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Характеристика</th>
                            {products.map(product => (
                                <th key={product.id} className="text-center">
                                    <Button
                                        variant="link"
                                        className="text-danger p-0 position-absolute top-0 end-0 m-2"
                                        onClick={() => handleRemoveFromCompare(product.id)}
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </Button>
                                    <div className="py-3">
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="img-fluid mb-2"
                                            style={{ maxHeight: '150px', objectFit: 'contain' }}
                                        />
                                        <h6 className="mb-0">{product.name}</h6>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {attributes.map(attr => (
                            <tr key={attr}>
                                <td className="fw-bold">
                                    {attr === 'name' ? 'Название' :
                                     attr === 'price' ? 'Цена' :
                                     attr === 'size' ? 'Размер' :
                                     attr === 'weight' ? 'Вес' : attr}
                                </td>
                                {products.map(product => (
                                    <td key={product.id} className="text-center">
                                        {attr === 'price' ? `${product[attr]} руб.` :
                                         attr === 'weight' ? `${product[attr]/1000} кг` :
                                         product[attr]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Row className="justify-content-center mt-4">
                <div className="col-auto">
                    <Link to="/menu">
                        <Button variant="outline-orange">Вернуться в каталог</Button>
                    </Link>
                </div>
            </Row>
        </MainContainer>
    );
} 