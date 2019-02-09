const mimeTypesByFileExtension = {
    'ico': 'image/x-icon',
    'html': 'text/html',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'css': 'text/css',
    'plain' : 'text/plain'
};

module.exports = (path) => {
    let filePathParts = path.split('/');

    let fileName = filePathParts[filePathParts.length - 1];

    let fileExtension = fileName.split('.')[1];

    return mimeTypesByFileExtension[fileExtension];
};


