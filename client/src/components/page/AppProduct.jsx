import MainContainer from "../util/MainContainer";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, FloatingLabel, Form, Row, Spinner, Stack} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {addNotification} from "../../store/notificationSlice";
import {useNavigate} from "react-router-dom";
import {authStateSelector} from "../../store/authSlice";
import {categoriesStateSelector, getCategories} from "../../store/categorySlice";
import {useEffect} from "react";
import Loader from "../util/Loader";
import {clearFetchedProducts, createProduct, productsStateSelector} from "../../store/productSlice";

export default function AppProduct() {
    const { isCreating } = useSelector(productsStateSelector);
    const { currentUser } = useSelector(authStateSelector);
    const { categories } = useSelector(categoriesStateSelector);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const {register, unregister, handleSubmit, watch, formState: {errors}} = useForm({
        mode: "onBlur"
    });

    const { name, image, variants } = errors;
    const watchSize = watch("variants[0].size");

    const onSubmit = async (data) => {
        const { category_id } = data;
        await dispatch(createProduct(data));
        dispatch(clearFetchedProducts(category_id));
        dispatch(addNotification({
            background: "text-bg-success",
            title: "Блюдо добавлено"
        }));
        navigate(`/menu/${category_id}`);
    };

    useEffect(() => {
        if (currentUser?.role !== 'ADMIN') {
            navigate("/");
        }
    }, [currentUser]);
    useEffect(() => {
        dispatch(getCategories());
    }, [categories]);
    useEffect(() => {
        if (!watchSize) {
            unregister("variants[1]");
        }
    }, [register, unregister, watchSize]);

    if (!categories) {
        return <Loader variant="dark" />;
    }

    const priceRegisterOptions = {
        required: "Обязательное поле",
        valueAsNumber: true,
        min: {
            value: 0.01,
            message: 'Цена должна быть больше 0'
        }
    };
    const weightRegisterOptions = {
        required: "Обязательное поле",
        valueAsNumber: true,
        min: {
            value: 1,
            message: 'Вес должен быть больше 0'
        }
    };

    return (
        <MainContainer>
            <h2 className="text-center">Добавление товара</h2>
            <Row className="mx-5">
                <Col>
                    <Stack>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-4">
                                <h4>Общая информация</h4>
                                <Row className="mt-3">
                                    <Col>
                                        <FloatingLabel controlId="product-category" label="Категория">
                                            <Form.Select className="form-orange" placeholder="категория" {...register("category_id")}>
                                                {categories.map(({ id, name }) => (<option value={id} key={id}>{name}</option>))}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="product-name" label="Название">
                                            <Form.Control className="form-orange" placeholder="название" type="text"
                                                          isInvalid={!!name}
                                                          {...register("name", {required: "Обязательное поле"})}/>
                                            <Form.Control.Feedback
                                                type="invalid">{name?.message}</Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </div>
                            <div className="p-4">
                                <h4>Изображение</h4>
                                <Row className="mt-3">
                                    <Col>
                                        <Form.Group controlId="product-image">
                                            <Form.Control type="file" className="form-orange" size="lg" accept=".png, .jpg"
                                                          isInvalid={!!image}
                                                          {...register("image", {required: "Необходимо выбрать изображение"})}/>
                                            <Form.Control.Feedback
                                                type="invalid">{image?.message}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            <div className="p-4">
                                <h4>Основная информация</h4>
                                <Row className="mt-3">
                                    <Col>
                                        <FloatingLabel controlId="product-price" label="Цена">
                                            <Form.Control className="form-orange" placeholder="цена" type="number"
                                                          step="any" isInvalid={!!variants?.[0]?.price}
                                                          {...register("variants[0].price", priceRegisterOptions)}/>
                                            <Form.Control.Feedback type="invalid">
                                                {variants?.[0]?.price?.message}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="product-weight" label="Вес">
                                            <Form.Control className="form-orange" placeholder="вес" type="number"
                                                          step="1" isInvalid={!!variants?.[0]?.weight}
                                                          {...register("variants[0].weight", weightRegisterOptions)}/>
                                            <Form.Control.Feedback type="invalid">
                                                {variants?.[0]?.weight?.message}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="product-size" label="Размер">
                                            <Form.Control className="form-orange" placeholder="размер"
                                                          type="text"
                                                          {...register("variants[0].size", {
                                                              setValueAs: v => v === '' ? null : v
                                                          })}/>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                {watchSize && (
                                    <Row className="mt-3">
                                        <Col>
                                            <FloatingLabel controlId="product-price2" label="Цена">
                                                <Form.Control className="form-orange" placeholder="цена" type="number"
                                                              step="any" isInvalid={!!variants?.[1]?.price}
                                                              {...register("variants[1].price", priceRegisterOptions)}/>
                                                <Form.Control.Feedback type="invalid">
                                                    {variants?.[1]?.price?.message}
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel controlId="product-weight2" label="Вес">
                                                <Form.Control className="form-orange" placeholder="вес" type="number"
                                                              step="1" isInvalid={!!variants?.[1]?.weight}
                                                              {...register("variants[1].weight", weightRegisterOptions)}/>
                                                <Form.Control.Feedback type="invalid">
                                                    {variants?.[1]?.weight?.message}
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Col>
                                        <Col>
                                            <FloatingLabel controlId="product-size2" label="Размер">
                                                <Form.Control className="form-orange" placeholder="размер"
                                                              type="text" isInvalid={!!variants?.[1]?.size}
                                                              {...register("variants[1].size", {required: "Обязательное поле"})}/>
                                                <Form.Control.Feedback type="invalid">
                                                    {variants?.[1]?.size?.message}
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                )}
                            </div>
                            <div className="px-4">
                                <Button variant="orange" className="btn-extra-lg w-100"
                                        type="submit" disabled={isCreating}>
                                    {isCreating && <Spinner size="sm"/>}
                                    {!isCreating && "Создать"}
                                </Button>
                            </div>
                        </Form>
                    </Stack>
                </Col>
            </Row>
        </MainContainer>
    )
}
