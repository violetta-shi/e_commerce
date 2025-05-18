const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const multer = require('multer');

const imagePath = path.join(__dirname, '..', '..', 'public', 'img');

const uploadToLocal = async (folder, originalName, body) => {
    const name = uuidv4() + path.extname(originalName);
    const fullPath = path.join(imagePath, folder || "", name);
    await fs.writeFile(fullPath, body);
    return `/static/img${folder ? '/' + folder : ''}/${name}`;
}

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024, //2 MB
        files: 3,
    }
});

module.exports = {
    upload,
    uploadToLocal,
}
