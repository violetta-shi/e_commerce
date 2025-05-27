import MainContainer from "../util/MainContainer";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, FloatingLabel, Form, Row, Spinner, Stack} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {addNotification} from "../../store/notificationSlice";
import {useNavigate} from "react-router-dom";
import {authStateSelector} from "../../store/authSlice";
import React, { useEffect, useState } from "react";
import Loader from "../util/Loader";
import {categoriesStateSelector, getCategories, createCategory, updateCategory, deleteCategory} from "../../store/categorySlice";

export default function AppCategoryAdmin() {
    const { isLoading, isCreating, isUpdating, isDeleting, categories, error } = useSelector(categoriesStateSelector);
    const { currentUser } = useSelector(authStateSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState('list');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        mode: "onBlur"
    });
    const { name, image } = errors;

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser?.role !== 'ADMIN') {
            navigate("/");
        }
    }, [currentUser]);

    const onSubmit = async (data) => {
        if (viewMode === 'create') {
            await dispatch(createCategory(data));
            dispatch(getCategories());
            dispatch(addNotification({
                background: "text-bg-success",
                title: "Категория добавлена"
            }));
            setViewMode('list');
        } else if (viewMode === 'edit' && selectedCategory) {
            const resultAction = await dispatch(updateCategory({ id: selectedCategory.id, data }));
            if (updateCategory.fulfilled.match(resultAction)) {
                dispatch(addNotification({
                    background: "text-bg-success",
                    title: "Изменения сохранены"
                }));
                dispatch(getCategories());
                setViewMode('list');
                setSelectedCategory(null);
            } else {
                dispatch(addNotification({
                    background: "text-bg-danger",
                    title: "Ошибка при сохранении изменений"
                }));
            }
        }
    };

    const handleCreateClick = () => {
        setViewMode('create');
        reset();
        setSelectedCategory(null);
    };

    const handleEditClick = (category) => {
        setViewMode('edit');
        setSelectedCategory(category);
        reset(category);
    };

    const handleDeleteClick = async (categoryId) => {
        const resultAction = await dispatch(deleteCategory(categoryId));
        if (deleteCategory.fulfilled.match(resultAction)) {
            dispatch(addNotification({
                background: "text-bg-success",
                title: "Категория удалена"
            }));
            dispatch(getCategories());
        } else {
            dispatch(addNotification({
                background: "text-bg-danger",
                title: "Ошибка при удалении категории"
            }));
        }
    };

    if (isLoading && (!categories || categories.length === 0)) {
        return <Loader variant="dark" />;
    }

    if (error) {
        return <MainContainer><div>Ошибка загрузки категорий: {error}</div></MainContainer>;
    }

    if (!currentUser || currentUser?.role !== 'ADMIN') {
        return null;
    }

    return (
        <MainContainer>
            <h2 className="text-center">Управление категориями</h2>

            {viewMode === 'list' && (
                <div>
                    <Button onClick={handleCreateClick} className="mb-3">Добавить новую категорию</Button>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Название</th>
                                <th>Изображение</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(!categories || categories.length === 0) ? (
                                <tr>
                                    <td colSpan="4">Нет категорий в базе данных.</td>
                                </tr>
                            ) : (
                                categories.map(category => (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td><img src={category.image_url} alt={category.name} style={{maxWidth: '100px'}} /></td>
                                        <td>
                                            <Button variant="primary" size="sm" className="me-2" onClick={() => handleEditClick(category)}>Изменить</Button>
                                            <Button variant="danger" size="sm" onClick={() => handleDeleteClick(category.id)}>Удалить</Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {(viewMode === 'create' || (viewMode === 'edit' && selectedCategory)) && (
                <div>
                    <h3>{viewMode === 'create' ? 'Создать новую категорию' : `Редактировать категорию: ${selectedCategory?.name}`}</h3>
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
                                                    <Form.Control.Feedback type="invalid">{name?.message}</Form.Control.Feedback>
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="p-4">
                                        <h4>Изображение</h4>
                                        <Row className="mt-3">
                                            <Col>
                                                <Form.Group controlId="category-image">
                                                    <Form.Control type="file" className="form-orange" size="lg" accept=".png, .jpg"
                                                        isInvalid={!!image}
                                                        {...register("image")}/>
                                                    <Form.Control.Feedback type="invalid">{image?.message}</Form.Control.Feedback>
                                                </Form.Group>
                                                {viewMode === 'edit' && selectedCategory?.image_url && (
                                                    <div className="mt-2">
                                                        Текущее изображение:<br/>
                                                        <img src={selectedCategory.image_url} alt="Category" style={{maxWidth: '100px', marginTop: '10px'}} />
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="px-4">
                                        <Button variant="orange" className="btn-extra-lg w-100"
                                                type="submit" disabled={isCreating || isUpdating}>
                                            {(isCreating || isUpdating) && <Spinner size="sm"/>}
                                            {!(isCreating || isUpdating) && (viewMode === 'create' ? 'Создать' : 'Сохранить изменения')}
                                        </Button>
                                        <Button variant="secondary" className="btn-extra-lg w-100 mt-2" onClick={() => setViewMode('list')}>Отмена</Button>
                                    </div>
                                </Form>
                            </Stack>
                        </Col>
                    </Row>
                </div>
            )}
        </MainContainer>
    );
} 