CREATE SCHEMA IF NOT EXISTS `project` DEFAULT CHARACTER SET utf8;
USE `project`;

CREATE TABLE IF NOT EXISTS `person`(
	`id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `last_name` VARCHAR(64) NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `phone` CHAR(9) NOT NULL
)ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(256) NOT NULL UNIQUE,
    `password` VARCHAR(256) NOT NULL,
    `role` VARCHAR(256) NOT NULL,
    `person_id` BIGINT NOT NULL,
    FOREIGN KEY (`person_id`) REFERENCES `person`(`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS  `supplier` (
    `supplier_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `company_name` VARCHAR(255) NOT NULL,
    `suplier_name` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(20),
    `email` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `category` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(256) NOT NULL,
    `image_url` VARCHAR(1024) NOT NULL
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `product` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `grouping_key` VARCHAR(256) NOT NULL,
    `category_id` BIGINT NOT NULL,
    `supplier_id` BIGINT NOT NULL,
    `name` VARCHAR(256) NOT NULL,
    `image_url` VARCHAR(1024) NOT NULL,
    `size` VARCHAR(256),
    `price` DECIMAL(10,2) NOT NULL,
    `weight` INTEGER NOT NULL,
    `color` VARCHAR(64),
    `material` VARCHAR(64),
    `power` INTEGER,
    `warranty_months` INTEGER,
    `energy_class` VARCHAR(2),
    `dimensions` VARCHAR(64),
    FOREIGN KEY (`category_id`) REFERENCES `category`(`id`),
    FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`supplier_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `address` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `city` VARCHAR(256) NOT NULL,
    `street` VARCHAR(1024) NOT NULL,
    `building` VARCHAR(256) NOT NULL,
    `housing` VARCHAR(256),
    `flat` VARCHAR(256),
    `entrance` INTEGER,
    `code` VARCHAR(256),
    `floor` INTEGER
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `order` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `payment_method` VARCHAR(256) NOT NULL,
    `delivery_timestamp` TIMESTAMP NOT NULL,
    `name` VARCHAR(256) NOT NULL,
    `email` VARCHAR(256),
    `phone_number` VARCHAR(256) NOT NULL,
    `comment` VARCHAR(1024),
    `total_price` DECIMAL(10,2) NOT NULL,
    `delivery_address_id` BIGINT NOT NULL,
    `created_by` BIGINT,
    `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    FOREIGN KEY (`delivery_address_id`) REFERENCES `address`(`id`),
    FOREIGN KEY (`created_by`) REFERENCES `user`(`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `order_item` (
    `order_id` BIGINT NOT NULL,
    `product_id` BIGINT NOT NULL,
    `amount` INTEGER NOT NULL,
    PRIMARY KEY (`order_id`, `product_id`),
    FOREIGN KEY (`order_id`) REFERENCES `order`(`id`),
    FOREIGN KEY (`product_id`) REFERENCES `product`(`id`)
) ENGINE = InnoDB;

