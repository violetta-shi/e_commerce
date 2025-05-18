const productsService = require('../service/products.service');
const { uploadToLocal } = require('../middleware/multipartform.middleware');
const { validateImageExtension } = require("../service/validator/file.validator");

const findAllByCategoryId = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        res.json(await productsService.findAllByCategoryId(categoryId));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const getProductStatistics = async (req, res, next) => {
    const getDefaultStartDate = () => {
        const now = new Date();
        now.setMonth(now.getMonth() - 3);
        return new Date(now.getFullYear(), now.getMonth(), 1);
    }
    try {
        const { startMonth, endMonth } = req.query; //should be date in format "yyyy-mm"
        const startDate = (startMonth && new Date(startMonth)) || getDefaultStartDate();
        const endDate = (endMonth && new Date(endMonth)) || new Date();
        const endDateExclusive = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1)

        res.json(await productsService.getProductStatistics(startDate, endDateExclusive));
    } catch (err) {
        console.error(err);
        next(err);
    }
}

const createProduct = async (req, res, next) => {
    try {
        const image = req.file;
        if (!image) {
            return res.status(400).json({message: 'Изображение обязательно'});
        }
        const errors = validateImageExtension(image.originalname);
        if (errors) {
            return res.status(400).json(errors);
        }
        const image_url = await uploadToLocal('product', image.originalname, image.buffer);
        const product = {
            ...JSON.parse(req.body?.data),
            image_url,
        }

        await productsService.createProduct(product);

        res.status(200).end();
    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    findAllByCategoryId,
    getProductStatistics,
    createProduct,
};
