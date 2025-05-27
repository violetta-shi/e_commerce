import MainContainer from "../util/MainContainer";
import {useDispatch, useSelector} from "react-redux";
import {bucketStateSelector, countBucketPrice, createOrder, isBucketEmpty} from "../../store/bucketSlice";
import {
    Button,
    Col,
    FloatingLabel,
    Form,
    Row, Spinner,
    Stack,
    ToggleButton,
    ToggleButtonGroup
} from "react-bootstrap";
import {Controller, useForm} from "react-hook-form";
import {addNotification} from "../../store/notificationSlice";
import {useNavigate} from "react-router-dom";

export default function AppOrder() {
    const { items, isCreating } = useSelector(bucketStateSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: "onBlur",
        defaultValues: {
            address: {
                city: "Минск"
            },
            payment_method: "cash",
        }
    });
    const {
        address: { city, street, building } = {},
        delivery_timestamp,
        name,
        phone_number
    } = errors;

    const isEmpty = isBucketEmpty(items);
    const bucketPrice = countBucketPrice(items);
    const bucketItems = Object.values(items);
    const onSubmit = async (data) => {
        const order = {
            ...data,
            total_price: +bucketPrice,
        };
        await dispatch(createOrder({items, order}));
        dispatch(addNotification({
            background: "text-bg-success",
            title: "Заказ успешно создан",
            message: "С вами скоро свяжется оператор"
        }));
        navigate("/");
    };

    if (isEmpty) {
        return (
            <MainContainer>
                <h2 className="text-center">Корзина пуста, добавьте что-нибудь для заказа...</h2>
            </MainContainer>
        )
    }

    return (
        <MainContainer>
            <h2 className="text-center">Оформление заказа</h2>
            <Row className="mx-5">
                <div className="col-8">
                    <Stack>
                        <div className="bg-gray-light rounded-4 p-4">
                            <h4>Ваш заказ</h4>
                            {bucketItems.map(({ product, amount }, idx) => (
                                <Stack direction="horizontal" key={product.id}
                                       className={`justify-content-between ${idx === bucketItems.length - 1 ? "" : "mb-2"}`}>
                                    <span>{product.name} <span className="text-light-dark fs-6">{product.size}</span></span>
                                    <span>{`${product.price} руб.`}</span>
                                </Stack>
                            ))}
                        </div>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-4">
                                <h4>Доставка</h4>
                                <Row className="mt-3">
                                    <Col>
                                        <FloatingLabel controlId="order-city" label="Город">
                                            <Form.Control className="form-orange" placeholder="город" type="text" isInvalid={!!city}
                                                          {...register("address.city", { required: "Обязательное поле" })}/>
                                            <Form.Control.Feedback type="invalid">{city?.message}</Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="order-street" label="Улица">
                                            <Form.Control className="form-orange" placeholder="улица" type="text" isInvalid={!!street}
                                                          {...register("address.street", { required: "Обязательное поле" })}/>
                                            <Form.Control.Feedback type="invalid">{street?.message}</Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <FloatingLabel controlId="order-building" label="Дом">
                                            <Form.Control className="form-orange" placeholder="дом" type="text" isInvalid={!!building}
                                                          {...register("address.building", { required: "Обязательное поле" })}/>
                                            <Form.Control.Feedback type="invalid">{building?.message}</Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="order-housing" label="Корпус">
                                            <Form.Control className="form-orange" placeholder="корпус" type="text"
                                                          {...register("address.housing")}/>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="order-flat" label="Квартира">
                                            <Form.Control className="form-orange" placeholder="квартира" type="text"
                                                          {...register("address.flat")}/>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <FloatingLabel controlId="order-entrance" label="Подъезд">
                                            <Form.Control className="form-orange" placeholder="подъезд" type="number"
                                                          {...register("address.entrance", { valueAsNumber: true })}/>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="order-code" label="Код подъезда">
                                            <Form.Control className="form-orange" placeholder="код подъезда" type="text"
                                                          maxLength="10" {...register("address.code")}/>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="order-floor" label="Этаж">
                                            <Form.Control className="form-orange" placeholder="этаж" type="number"
                                                           {...register("address.floor", { valueAsNumber: true })}/>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </div>
                            <div className="p-4">
                                <h4>Время доставки</h4>
                                <Row className="mt-3">
                                    <Col>
                                        <FloatingLabel controlId="order-delivery-timestamp" label="Время доставки">
                                            <Form.Control className="form-orange" placeholder="время доставки"
                                                          type="datetime-local" isInvalid={!!delivery_timestamp}
                                                          {...register("delivery_timestamp", { required: "Обязательное поле" })}/>
                                            <Form.Control.Feedback type="invalid">{delivery_timestamp?.message}</Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </div>
                            <div className="p-4">
                                <h4>Ваши данные</h4>
                                <Row className="mt-3">
                                    <Col>
                                        <FloatingLabel controlId="order-name" label="Имя">
                                            <Form.Control className="form-orange" placeholder="имя" type="text" isInvalid={!!name}
                                                          {...register("name", { required: "Обязательное поле" })}/>
                                            <Form.Control.Feedback type="invalid">{name?.message}</Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="order-email" label="Email">
                                            <Form.Control className="form-orange" placeholder="email" type="email"
                                                          {...register("email")}/>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="order-phone-number" label="Номер телефона">
                                            <Form.Control className="form-orange" placeholder="номер телефона" type="text" isInvalid={!!phone_number}
                                                          {...register("phone_number", {
                                                              required: "Обязательное поле",
                                                              pattern: {
                                                                  value: /\+375\d{9}/,
                                                                  message: 'Введите в формате +375XXXXXXXXX'
                                                              }
                                                          })}/>
                                            <Form.Control.Feedback type="invalid">{phone_number?.message}</Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </div>
                            <div className="p-4">
                                <h4>Способ оплаты</h4>
                                <Row className="mt-3">
                                    <Col>
                                        <Controller
                                            render={({field: {onChange, value}}) => (
                                                <ToggleButtonGroup type="radio" className="w-100" name="payment_method"
                                                                   onChange={onChange} value={value}>
                                                    <ToggleButton variant="outline-orange" id="order-payment-1" value={"cash"}>
                                                        Наличные
                                                    </ToggleButton>
                                                    <ToggleButton variant="outline-orange" id="order-payment-2" value={"card"}>
                                                        Картой курьеру
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                            )}
                                            name="payment_method"
                                            control={control}
                                        />
                                    </Col>
                                </Row>
                            </div>
                            <div className="p-4">
                                <h4>Комментарий к заказу</h4>
                                <Row className="mt-3">
                                    <Col>
                                        <FloatingLabel controlId="order-comment" label="Ваш комментарий...">
                                            <Form.Control as="textarea" className="form-orange" placeholder="комментарий"
                                                          maxLength="480" style={{height: "100px"}}
                                                          {...register("comment")}/>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </div>
                            <div className="px-4">
                                <Button variant="orange" className="btn-extra-lg w-100" type="submit"
                                        disabled={isCreating}>
                                    {isCreating && <Spinner size="sm"/>}
                                    {!isCreating && "Оформить заказ"}
                                </Button>
                            </div>
                        </Form>
                    </Stack>
                </div>
                <div className="col-4">
                    <div className="bg-gray-light rounded-4 p-4">
                        <h4>Оплата</h4>
                        <Stack direction="horizontal" className="justify-content-between">
                            <span>Сумма заказа</span>
                            <span>{`${bucketPrice} руб.`}</span>
                        </Stack>
                        <hr/>
                        <Stack direction="horizontal" className="justify-content-between fs-5">
                            <span>Итого к оплате</span>
                            <span>{`${bucketPrice} руб.`}</span>
                        </Stack>
                    </div>
                </div>
            </Row>
        </MainContainer>
)
}
