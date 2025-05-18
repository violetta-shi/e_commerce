const path = require('path');

const validateImageExtension = (name) => {
    const extension = path.extname(name);
    if (!['.png', '.jpg'].includes(extension)) {
        return {
            message: 'Неверный формат изображения. Допустимо только png или jpg',
        };
    }
};

module.exports = {
    validateImageExtension
}
