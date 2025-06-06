INSERT INTO `user` (`id`, `email`, `password`, `role`, `person_id`)
VALUES (1, 'admin@admin.com', '$2a$10$xVk1ygB72.UPQ5.j5ECxqesDvfGUxMLqH03r9cQ/eVJ9I9MR9TFQ.', 'ADMIN'), #pass: admin
       (2, 'example1@example.com', '$2a$10$RMYOEWmASW/5K9hkjkLfA.SEXX1q531X694M40RuyDp9WOs6Y0fl.', 'USER'), #pass: 1234
       (3, 'example2@example.com', '$2a$10$rRHZM0tbOsFE8kZw1E0iBOjdd3YAiz3ioWpIyBElet.VnzsIQIPGu', 'USER'), #pass: 1235
       (4, 'example3@example.com', '$2a$10$ydrRFP49JUUCfIL7e1fhFOXxqpJJuH7FD7AY31XqfEENZW1BtlSEa', 'USER'); #pass: 1236
ALTER TABLE `user` AUTO_INCREMENT = 5;

INSERT INTO `category` (`name`, `image_url`) VALUES
('Холодильники', '/static/img/category/refrigerator_category.jpg'),
('Морозильные камеры', '/static/img/category/freezer_category.jpg'),
('Стиральные машины', '/static/img/category/washing_machine_category.jpg'),
('Посудомоечные машины', '/static/img/category/dishwasher_category.jpg'),
('Газовые плиты', '/static/img/category/gas_stove_category.jpg'),
('Электрические плиты', '/static/img/category/electric_stove_category.jpg'),
('Вытяжки', '/static/img/category/hood_category.jpg'),
('Микроволновые печи', '/static/img/category/microwave_category.jpg'),
('Чайники', '/static/img/category/kettle_category.jpg'),
('Тостеры', '/static/img/category/toaster_category.jpg'),
('Кофеварки', '/static/img/category/coffee_machine_category.jpg'),
('Пылесосы', '/static/img/category/vacuum_cleaner_category.jpg'),
('Утюги', '/static/img/category/iron_category.jpg'),
('Обогреватели', '/static/img/category/heater_category.jpg'),
('Кондиционеры', '/static/img/category/air_conditioner_category.jpg');

INSERT INTO `product` (`id`, `grouping_key`, `category_id`, `supplier_id`, `name`, `image_url`, `size`, `price`, `weight`) VALUES
(1, 'home-appliances', 1, 1, 'Холодильник Samsung RT32', '/static/img/products/refrigerator_samsung_rt32.jpg', '320 л', 35990.00, 60000),
(2, 'home-appliances', 1, 2, 'Холодильник LG GA-B509', '/static/img/products/refrigerator_lg_ga_b509.jpg', '384 л', 45990.00, 70000),
(3, 'home-appliances', 2, 1, 'Морозильная камера Liebherr GP 1476', '/static/img/products/freezer_liebherr_gp1476.jpg', '150 л', 29990.00, 50000),
(4, 'home-appliances', 3, 3, 'Стиральная машина Bosch WAN24260', '/static/img/products/washing_machine_bosch_wan24260.jpg', '7 кг', 39990.00, 80000),
(5, 'home-appliances', 4, 4, 'Посудомоечная машина Electrolux ESF9526', '/static/img/products/dishwasher_electrolux_esf9526.jpg', '14 комплектов', 49990.00, 45000),
(6, 'home-appliances', 5, 5, 'Газовая плита GEFEST 6100', '/static/img/products/gas_stove_gefest_6100.jpg', '4 конфорки', 19990.00, 40000),
(7, 'home-appliances', 8, 4, 'Микроволновая печь Panasonic NN-GD37', '/static/img/products/microwave_panasonic_nngd37.jpg', '23 л', 14990.00, 12000),
(8, 'home-appliances', 9, 2, 'Чайник Philips HD4646', '/static/img/products/kettle_philips_hd4646.jpg', '1.5 л', 2990.00, 1500),
(9, 'home-appliances', 12, 3, 'Пылесос Dyson V11', '/static/img/products/vacuum_cleaner_dyson_v11.jpg', '60 мин работы', 59990.00, 3500),
(10, 'home-appliances', 15, 2, 'Кондиционер Mitsubishi MSZ-LN35', '/static/img/products/air_conditioner_mitsubishi_mszln35.jpg', 'до 35 м²', 99990.00, 11000),
(11, 'home-appliances', 1, 1, 'Холодильник Sharp SJ-X265M', '/static/img/products/refrigerator_sharp_sj_x265m.jpg', '255 л', 28990.00, 55000),
(12, 'home-appliances', 2, 2, 'Морозильная камера Zanussi ZFU 20400WA', '/static/img/products/freezer_zanussi_zfu20400wa.jpg', '200 л', 24990.00, 60000),
(13, 'home-appliances', 3, 2, 'Стиральная машина Indesit BWSA 61051', '/static/img/products/washing_machine_indesit_bwsa61051.jpg', '6 кг', 19990.00, 70000),
(14, 'home-appliances', 4, 2, 'Посудомоечная машина Beko DIS 15010', '/static/img/products/dishwasher_beko_dis15010.jpg', '10 комплектов', 25990.00, 40000),
(15, 'home-appliances', 5, 3, 'Газовая плита Мечта 5041', '/static/img/products/gas_stove_mечта_5041.jpg', '4 конфорки', 17990.00, 35000),
(16, 'home-appliances', 6, 3, 'Электрическая плита Gefest 5300', '/static/img/products/electric_stove_gefest_5300.jpg', '4 конфорки', 22990.00, 30000),
(17, 'home-appliances', 7, 1, 'Вытяжка Elica Nikola Tesla', '/static/img/products/hood_elica_nikola_tesla.jpg', '60 см', 32990.00, 12000),
(18, 'home-appliances', 8, 1, 'Микроволновая печь Samsung ME81K', '/static/img/products/microwave_samsung_me81k.jpg', '23 л', 7990.00, 10000),
(19, 'home-appliances', 10, 3, 'Тостер Bosch TAT6A913', '/static/img/products/toaster_bosch_tat6a913.jpg', '2 ломтика', 3990.00, 1500),
(20, 'home-appliances', 11, 4, 'Кофеварка DeLonghi ECAM 23.420', '/static/img/products/coffee_machine_delonghi_ecam23420.jpg', '1.8 л', 27990.00, 5000),
(21, 'home-appliances', 5, 1, 'Газовая плита Атлант ХМ 4324', '/static/img/products/gas_stove_atlant_xm_4324.jpg', '4 конфорки', 24990.00, 40000),
(22, 'home-appliances', 6, 2, 'Электрическая плита Gorenje EC5321', '/static/img/products/electric_stove_gorenje_ec5321.jpg', '4 конфорки', 18990.00, 30000),
(23, 'home-appliances', 7, 3, 'Вытяжка Hansa OKP 642', '/static/img/products/hood_hansa_okp_642.jpg', '60 см', 11990.00, 9000),
(24, 'home-appliances', 8, 4, 'Микроволновая печь LG MS-2535GR', '/static/img/products/microwave_lg_ms_2535gr.jpg', '25 л', 8990.00, 12000),
(25, 'home-appliances', 9, 5, 'Чайник Philips HD9306', '/static/img/products/kettle_philips_hd9306.jpg', '1.7 л', 2990.00, 1500),
(26, 'home-appliances', 10, 1, 'Тостер Moulinex LT2610', '/static/img/products/toaster_moulinex_lt2610.jpg', '2 ломтика', 2490.00, 1000),
(27, 'home-appliances', 11, 2, 'Кофеварка Philips HD8650', '/static/img/products/coffee_machine_philips_hd8650.jpg', '1.8 л', 14990.00, 4000),
(28, 'home-appliances', 12, 3, 'Пылесос Samsung VC18M2130', '/static/img/products/vacuum_cleaner_samsung_vc18m2130.jpg', '1800 Вт', 7990.00, 4500),
(29, 'home-appliances', 13, 4, 'Утюг Bosch TDI9020', '/static/img/products/iron_bosch_tdi9020.jpg', '2400 Вт', 5990.00, 2000),
(30, 'home-appliances', 14, 5, 'Обогреватель Ballu BHP-M2-03', '/static/img/products/heater_ballu_bhp_m2_03.jpg', '2000 Вт', 2790.00, 3500);



INSERT INTO `address` (`id`, `city`, `street`, `building`, `housing`, `flat`, `entrance`, `code`, `floor`) VALUES
(1, 'Минск', 'Проспект Независимости', '10', '1', '5', 3, '123456', 4),
(2, 'Минск', 'Улица Ленина', '15', '2', '8', 1, '234567', 2),
(3, 'Минск', 'Улица Карла Маркса', '20', '3', '12', 2, '345678', 5),
(4, 'Минск', 'Улица Свердлова', '5', '1', '6', 4, '456789', 3),
(5, 'Минск', 'Улица Победителей', '30', '2', '15', 1, '567890', 6),
(6, 'Минск', 'Улица Козлова', '7', '4', '10', 2, '678901', 8),
(7, 'Минск', 'Ленина', '30', '2', '12', 1, '1234', 4),
(8, 'Минск', 'Независимости', '45', '1', '4', 2, '2345', 5),
(9, 'Минск', 'Кальварийская', '50', '3', '8', 1, '3456', 6),
(10, 'Минск', 'Победителей', '76', '4', '11', 2, '4567', 7),
(11, 'Минск', 'Московская', '12', '5', '3', 1, '5678', 8),
(12, 'Минск', 'Тимирязева', '23', '6', '9', 3, '6789', 9),
(13, 'Минск', 'Грушевская', '18', '7', '7', 2, '7890', 2),
(14, 'Минск', 'Лобанка', '31', '8', '10', 4, '8901', 10),
(15, 'Минск', 'Фрунзе', '52', '9', '5', 1, '9012', 3),
(16, 'Минск', 'Петрова', '10', '10', '6', 2, '0123', 4),
(17, 'Минск', 'Ки́рова', '22', '11', '2', 3, '1234', 2),
(18, 'Минск', 'Герцена', '28', '12', '13', 1, '2345', 5),
(19, 'Минск', 'Притыцкого', '60', '13', '14', 4, '3456', 6),
(20, 'Минск', 'Скорины', '13', '14', '15', 2, '4567', 7),
(21, 'Минск', 'ул. Ленина', '10', '1', '25', 3, 'А5', 5),
(22, 'Минск', 'ул. Победителей', '100', '2', '30', 4, 'B7', 9),
(23, 'Минск', 'пр. Независимости', '200', '3', '15', 1, 'C3', 8),
(24, 'Минск', 'ул. Горького', '45', '4', '20', 2, 'D9', 2),
(25, 'Минск', 'ул. Маяковского', '12', '5', '18', 1, 'E1', 6),
(26, 'Минск', 'ул. Фрунзе', '8', '6', '12', 3, 'F4', 7),
(27, 'Минск', 'пр. Машерова', '33', '7', '10', 4, 'G2', 10),
(28, 'Минск', 'ул. Шорса', '17', '8', '7', 2, 'H6', 3),
(29, 'Минск', 'пр. Победы', '55', '9', '3', 1, 'I8', 4),
(30, 'Минск', 'ул. Воронянского', '25', '10', '8', 5, 'J2', 9),
(31, 'Минск', 'ул. Клары Цеткин', '13', '11', '2', 1, 'K4', 6),
(32, 'Минск', 'ул. Октябрьская', '21', '12', '11', 2, 'L7', 5),
(33, 'Минск', 'пр. Рокоссовского', '7', '13', '22', 1, 'M3', 4),
(34, 'Минск', 'ул. Димитрова', '34', '14', '14', 3, 'N1', 7),
(35, 'Минск', 'ул. Тимирязева', '16', '15', '9', 2, 'O5', 6),
(36, 'Минск', 'ул. Пушкина', '48', '16', '23', 4, 'P9', 3),
(37, 'Минск', 'пр. Строителей', '51', '17', '6', 1, 'Q4', 8),
(38, 'Минск', 'ул. Зигмунда', '7', '18', '28', 5, 'R2', 4),
(39, 'Минск', 'ул. Советская', '3', '19', '17', 2, 'S8', 9),
(40, 'Минск', 'ул. Копылова', '9', '20', '16', 3, 'T6', 10);



INSERT INTO `order` (`id`, `payment_method`, `delivery_timestamp`, `name`, `email`, `phone_number`, `comment`, `total_price`, `delivery_address_id`, `created_by`, `created_at`) VALUES
(1, 'card', '2024-12-20 14:30:00', 'Иван Иванов', 'ivanov@mail.com', '375291234567', 'Нет комментариев', 15990.00, 1, 1, '2024-12-15 10:00:00'),
(2, 'cash', '2024-12-21 18:00:00', 'Мария Петрова', 'maria@mail.com', '375291234568', 'Доставка в квартиру', 23990.00, 2, 2, '2024-12-15 11:15:00'),
(3, 'card', '2024-12-22 09:00:00', 'Олег Смирнов', 'oleg@mail.com', '375291234569', 'Не звонить заранее', 34990.00, 3, 3, '2024-12-16 12:30:00'),
(4, 'cash', '2024-12-23 17:00:00', 'Анна Ковалёва', 'anna@mail.com', '375291234570', 'Подробные инструкции по доставке', 19990.00, 4, 4, '2024-12-17 14:45:00'),
(5, 'card', '2024-12-24 13:00:00', 'Дмитрий Ильин', 'dmitry@mail.com', '375291234571', 'Оплатить при доставке', 27990.00, 5, 5, '2024-12-18 09:10:00'),
(6, 'cash', '2024-12-25 16:00:00', 'Елена Васильева', 'elena@mail.com', '375291234572', 'Курьеру не звонить', 34990.00, 1, 1, '2024-12-19 11:20:00'),
(7, 'card', '2024-12-26 14:30:00', 'Сергей Кузнецов', 'sergey@mail.com', '375291234573', 'Доставить до подъезда', 15990.00, 2, 1, '2024-12-20 15:00:00'),
(8, 'cash', '2024-12-27 11:00:00', 'Наталья Лебедева', 'natalia@mail.com', '375291234574', 'Подтвердить заказ по телефону', 21990.00, 1, 2, '2024-12-21 16:30:00'),
(9, 'card', '2024-12-28 19:00:00', 'Александр Попов', 'alexander@mail.com', '375291234575', 'Звонить за 30 минут до прибытия', 17990.00, 1, 3, '2024-12-22 17:45:00'),
(10, 'cash', '2024-12-29 10:00:00', 'Татьяна Морозова', 'tatiana@mail.com', '375291234576', 'Пожелания нет', 28990.00, 3, 4, '2024-12-23 13:20:00'),
(11, 'card', '2024-12-30 15:00:00', 'Игорь Сидоров', 'igor@mail.com', '375291234577', 'Не доставлять в выходные', 22990.00, 4, 5, '2024-12-24 12:00:00'),


INSERT INTO `order_item` (`order_id`, `product_id`, `amount`)
VALUES (1, 49, 2),
       (2, 9, 2),
       (3, 13, 1),
       (4, 38, 1),
       (5, 62, 2),
       (6, 16, 2),
       (7, 20, 1),
       (8, 39, 3),
       (9, 8, 1),
       (10, 34, 1),
       (11, 19, 2),
       (12, 35, 3),
       (13, 35, 1),
       (14, 44, 1),
       (15, 31, 2),
       (16, 46, 3),
       (17, 58, 2),
       (18, 20, 2),
       (19, 24, 3),
       (20, 32, 3),
       (21, 25, 3),
       (22, 16, 2),
       (23, 37, 1),
       (24, 17, 1),
       (25, 39, 3),
       (26, 51, 2),
       (27, 12, 1),
       (28, 15, 2),
       (29, 53, 2),
       (30, 8, 1),
       (31, 7, 3),
       (32, 35, 2),
       (33, 49, 1),
       (34, 64, 2),
       (35, 64, 1),
       (36, 43, 2),
       (37, 36, 3),
       (38, 3, 2),
       (39, 55, 3),
       (40, 16, 1),
       (41, 47, 1),
       (42, 13, 2),
       (43, 29, 1),
       (44, 47, 2),
       (45, 39, 3),
       (46, 51, 2),
       (47, 35, 1),
       (48, 54, 3),
       (49, 47, 2),
       (50, 40, 3),
       (51, 59, 3),
       (52, 25, 2),
       (53, 10, 1),
       (54, 20, 1),
       (55, 30, 2),
       (56, 37, 1),
       (57, 62, 1),
       (58, 33, 2),
       (59, 40, 2),
       (60, 51, 2),
       (61, 46, 3),
       (62, 45, 1),
       (63, 18, 2),
       (64, 40, 1),
       (65, 15, 1),
       (66, 36, 2),
       (67, 10, 2),
       (68, 62, 1),
       (69, 65, 3),
       (70, 17, 1),
       (71, 10, 1),
       (72, 40, 3),
       (73, 39, 1),
       (74, 22, 3),
       (75, 1, 1),
       (76, 20, 2),
       (77, 3, 2),
       (78, 25, 3),
       (79, 56, 1),
       (80, 18, 3),
       (81, 51, 3),
       (82, 1, 3),
       (83, 33, 2),
       (84, 60, 3),
       (85, 7, 1),
       (86, 3, 3),
       (87, 30, 1),
       (88, 7, 2),
       (89, 37, 3),
       (90, 48, 2),
       (91, 59, 3),
       (92, 62, 3),
       (93, 48, 3),
       (94, 48, 2),
       (95, 49, 3),
       (96, 20, 1),
       (97, 3, 3),
       (98, 26, 1),
       (99, 22, 1),
       (100, 9, 3);
