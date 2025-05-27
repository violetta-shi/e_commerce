const categoriesService = require('../service/categories.service');
const { uploadToLocal } = require('../middleware/multipartform.middleware');
const { validateImageExtension } = require("../service/validator/file.validator");

const findAll = async (req, res, next) => {
    try {
        res.json(await categoriesService.findAll());
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const createCategory = async (req, res, next) => {
    try {
        const image = req.file;
        if (!image) {
            return res.status(400).json({message: 'Изображение обязательно'});
        }
        const errors = validateImageExtension(image.originalname);
        if (errors) {
            return res.status(400).json(errors);
        }
        const image_url = await uploadToLocal('category', image.originalname, image.buffer);
        const category = {
            ...JSON.parse(req.body?.data),
            image_url,
        }

        await categoriesService.createCategory(category);

        res.status(200).end();
    } catch (err) {
        console.error(err);
        next(err);
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        let image_url;
        if (req.file) {
            const errors = validateImageExtension(req.file.originalname);
            if (errors) {
                return res.status(400).json(errors);
            }
            image_url = await uploadToLocal('category', req.file.originalname, req.file.buffer);
        }
        let data = req.body;
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        const updateData = {
            ...data,
        };
        if (image_url) updateData.image_url = image_url;
        await categoriesService.updateCategory(id, updateData);
        res.status(200).end();
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        await categoriesService.deleteCategory(id);
        res.status(200).end();
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {
    findAll,
    createCategory,
    updateCategory,
    deleteCategory,
};