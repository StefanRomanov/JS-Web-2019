const fs = require('fs');


module.exports = (images, htmlPage) => {

        let imagesHtml = '';
        for (let image of images) {
            imagesHtml += `<fieldset id => <legend>${image.title}:</legend> 
                                            <img src="${image.url}">
                                            </img><p>${image.description}<p/>
                                            <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete
                                            </button> 
                                          </fieldset>`;
        }

        return htmlPage.toString().replace('<div class="replaceMe"></div>', imagesHtml);
}