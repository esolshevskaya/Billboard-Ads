document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail-images img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            mainImage.src = this.src;
        });
    });

    const thumbnailContainer = document.querySelector('.thumbnail-images');

});
