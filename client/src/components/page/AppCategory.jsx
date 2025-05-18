import MainContainer from "../util/MainContainer";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, FloatingLabel, Form, Row, Spinner, Stack} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {addNotification} from "../../store/notificationSlice";
import {useNavigate} from "react-router-dom";
import {authStateSelector} from "../../store/authSlice";
import {useEffect} from "react";
import {createCategory, categoriesStateSelector} from "../../store/categorySlice";

export default function AppCategory(){
    const {isCreating} = useSelector(categoriesStateSelector);
    const {currentUser} = useSelector(authStateSelector);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const {register,  handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur"
    });

    const { name, image} = errors;

    const onSubmit = async (data) => {
        await dispatch(createCategory(data));
        dispatch(addNotification({
            background: "text-bg-success",
            title: "Категория добавлена"
        }));
    };

    useEffect(() => {
        if (currentUser?.role !== 'ADMIN') {
            navigate("/");
        }
    }, [currentUser]);
    return(
        <MainContainer>
            <h2 className="text-center">Добавление категории</h2>
            <Row className="mx-5">
                <Col>
                    <Stack>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-4">
                                <h4>Общая информация</h4>
                                <Row className="mt-3">
                                    <Col>
                                        <FloatingLabel label="Название" controlId="category-name">
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
                                        <Form.Group controlId="category-image">
                                            <Form.Control type="file" className="form-orange" size = "lg" accept=".png, .jpg"
                                                          isInvalid={!!image}
                                                {...register("image", {required:"Необходимо выбрать изображение"})}/>
                                            <Form.Control.Feedback
                                                type="invalid">{image?.message}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
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