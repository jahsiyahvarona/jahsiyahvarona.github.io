/**
 * Handles dish image click events to display dish details.
 * When a dish image is clicked, it is enlarged (via the "selected" class) and its
 * corresponding description and cost are displayed in the dish description container.
 */
document.addEventListener('DOMContentLoaded', () => {
    let dishImages = document.querySelectorAll('.dish-image');
    let dishDescriptionContainer = document.getElementById('dish-description-container');

    dishImages.forEach(image => {
        image.addEventListener('click', () => {
            // Remove selected class from all images
            dishImages.forEach(img => img.classList.remove('selected'));

            // Add selected class to clicked image
            image.classList.add('selected');

            // Retrieve dish details from data attributes
            let dishName = image.getAttribute('data-dish');
            let dishCost = image.getAttribute('data-cost');
            let dishDesc = image.getAttribute('data-description');

            // Clear any existing content in the description container
            dishDescriptionContainer.innerHTML = '';

            // Create elements for dish details
            let dishTitle = document.createElement('h3');
            dishTitle.textContent = dishName;

            let dishDetails = document.createElement('p');
            dishDetails.textContent = dishDesc;

            let dishPrice = document.createElement('p');
            dishPrice.textContent = 'Cost: $' + dishCost;

            // Append the details to the container
            dishDescriptionContainer.appendChild(dishTitle);
            dishDescriptionContainer.appendChild(dishDetails);
            dishDescriptionContainer.appendChild(dishPrice);
        });
    });
});