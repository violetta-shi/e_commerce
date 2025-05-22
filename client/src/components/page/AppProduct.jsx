import MainContainer from "../util/MainContainer";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, FloatingLabel, Form, Row, Spinner, Stack} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {addNotification} from "../../store/notificationSlice";
import {useNavigate} from "react-router-dom";
import {authStateSelector} from "../../store/authSlice";
import {categoriesStateSelector, getCategories} from "../../store/categorySlice";
import React, { useEffect, useState } from "react";
import Loader from "../util/Loader";
import {clearFetchedProducts, createProduct, productsStateSelector, fetchAllProducts, updateProduct} from "../../store/productSlice";

export default function AppProduct() {
    const { isCreating, isLoading, allProducts, error } = useSelector(productsStateSelector);
    const { currentUser } = useSelector(authStateSelector);
    const { categories } = useSelector(categoriesStateSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState('list');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const {register, unregister, handleSubmit, watch, reset, formState: {errors}} = useForm({
        mode: "onBlur"
    });

    const { name, image, variants } = errors;
    const watchSize = watch("variants[0].size");

    useEffect(() => {
        dispatch(fetchAllProducts());
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser?.role !== 'ADMIN') {
            navigate("/");
        }
    }, [currentUser]);

    useEffect(() => {
        if (viewMode === 'create' && !watchSize) {
            unregister("variants[1]");
        }
    }, [register, unregister, watchSize, viewMode]);

    const onSubmit = async (data) => {
        if (viewMode === 'create') {
            const { category_id } = data;
            await dispatch(createProduct(data));
            dispatch(fetchAllProducts());
            dispatch(addNotification({
                background: "text-bg-success",
                title: "Блюдо добавлено"
            }));
            setViewMode('list');
        } else if (viewMode === 'edit' && selectedProduct) {
            console.log('Update product:', selectedProduct.id, data);
            const { image, ...updateData } = data; // Exclude image from update data
            const resultAction = await dispatch(updateProduct({ id: selectedProduct.id, data: updateData }));
            if (updateProduct.fulfilled.match(resultAction)) {
                 dispatch(addNotification({
                     background: "text-bg-success",
                     title: "Изменения сохранены"
                 }));
                 dispatch(fetchAllProducts()); // Refetch all after updating
                 setViewMode('list');
                 setSelectedProduct(null);
            } else {
                 // Handle error if needed, maybe show a notification
                 console.error('Failed to update product:', resultAction.error);
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
        setSelectedProduct(null);
    };

    const handleEditClick = (product) => {
        setViewMode('edit');
        setSelectedProduct(product);
        console.log('Editing product:', product);
        reset(product);
    };

    const handleDeleteClick = async (productId) => {
        console.log('Deleting product:', productId);
    };

    if (isLoading && allProducts.length === 0) {
        return <Loader variant="dark" />;
    }

    if (error) {
        return <MainContainer><div>Error loading products: {error}</div></MainContainer>;
    }

    if (!currentUser || currentUser?.role !== 'ADMIN') {
        return null;
    }

    return (
        <MainContainer>
            <h2 className="text-center">Управление товарами</h2>

            {viewMode === 'list' && (
                <div>
                    <Button onClick={handleCreateClick} className="mb-3">Добавить новый товар</Button>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Название</th>
                                <th>Категория ID</th>
                                <th>Поставщик ID</th>
                                <th>Изображение URL</th>
                                <th>Размер</th>
                                <th>Цена</th>
                                <th>Вес</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="9">Нет товаров в базе данных.</td>
                                </tr>
                            ) : (
                                allProducts.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category_id}</td>
                                        <td>{product.supplier_id}</td>
                                        <td>{product.image_url}</td>
                                        <td>{product.size}</td>
                                        <td>{product.price} руб.</td>
                                        <td>{product.weight} кг.</td>
                                        <td>
                                            <Button variant="primary" size="sm" className="me-2" onClick={() => handleEditClick(product)}>Изменить</Button>
                                            <Button variant="danger" size="sm" onClick={() => handleDeleteClick(product.id)}>Удалить</Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {viewMode === 'create' && (
                <div>
                    <h3>Создать новый товар</h3>
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
                                                                  {...register("variants[0].price", {required: "Обязательное поле", valueAsNumber: true, min: { value: 0.01, message: 'Цена должна быть больше 0'}})}/>
                                                    <Form.Control.Feedback type="invalid">
                                                        {variants?.[0]?.price?.message}
                                                    </Form.Control.Feedback>
                                                </FloatingLabel>
                                            </Col>
                                            <Col>
                                                <FloatingLabel controlId="product-weight" label="Вес">
                                                     <Form.Control className="form-orange" placeholder="вес" type="number"
                                                                  step="1" isInvalid={!!variants?.[0]?.weight}
                                                                  {...register("variants[0].weight", {required: "Обязательное поле", valueAsNumber: true, min: { value: 1, message: 'Вес должен быть больше 0'}})}/>
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
                                                                            {...register("variants[1].price", {required: "Обязательное поле", valueAsNumber: true, min: { value: 0.01, message: 'Цена должна быть больше 0'}})}/>
                                                              <Form.Control.Feedback type="invalid">
                                                                  {variants?.[1]?.price?.message}
                                                              </Form.Control.Feedback>
                                                          </FloatingLabel>
                                                      </Col>
                                                      <Col>
                                                          <FloatingLabel controlId="product-weight2" label="Вес">
                                                              <Form.Control className="form-orange" placeholder="вес" type="number"
                                                                            step="1" isInvalid={!!variants?.[1]?.weight}
                                                                            {...register("variants[1].weight", {required: "Обязательное поле", valueAsNumber: true, min: { value: 1, message: 'Вес должен быть больше 0'}})}/>
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
                    </div>
                )}

                {viewMode === 'edit' && selectedProduct && (
                     <div>
                        <h3>Редактировать товар: {selectedProduct.name}</h3>
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
                                                         <Form.Label>Изображение (оставьте пустым чтобы не менять)</Form.Label>
                                                         <Form.Control type="file" className="form-orange" size="lg" accept=".png, .jpg"
                                                                       isInvalid={!!image}
                                                                       {...register("image")}/>
                                                         <Form.Control.Feedback
                                                             type="invalid">{image?.message}</Form.Control.Feedback>
                                                     </Form.Group>
                                                      {selectedProduct.image_url && (
                                                          <div className="mt-2">
                                                              Текущее изображение:
                                                              <img src={selectedProduct.image_url} alt="Product" style={{maxWidth: '100px', marginTop: '10px'}} />
                                                          </div>
                                                      )}
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
                                                                       {...register("variants[0].price", {required: "Обязательное поле", valueAsNumber: true, min: { value: 0.01, message: 'Цена должна быть больше 0'}})}/>
                                                         <Form.Control.Feedback type="invalid">
                                                             {variants?.[0]?.price?.message}
                                                         </Form.Control.Feedback>
                                                     </FloatingLabel>
                                                 </Col>
                                                 <Col>
                                                     <FloatingLabel controlId="product-weight" label="Вес">
                                                          <Form.Control className="form-orange" placeholder="вес" type="number"
                                                                       step="1" isInvalid={!!variants?.[0]?.weight}
                                                                       {...register("variants[0].weight", {required: "Обязательное поле", valueAsNumber: true, min: { value: 1, message: 'Вес должен быть больше 0'}})}/>
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
                                               {/* For simplicity, not handling adding/removing variants in edit mode here */}
                                           </div>
                                          <div className="px-4">
                                              <Button variant="orange" className="btn-extra-lg w-100"
                                                      type="submit" disabled={isCreating}>
                                                  {isCreating && <Spinner size="sm"/>}
                                                  {!isCreating && "Сохранить изменения"}
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
    )
}
