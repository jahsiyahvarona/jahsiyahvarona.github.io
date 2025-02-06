document.addEventListener('DOMContentLoaded', function() {
    // JavaScript to update the main image when a thumbnail is clicked
    document.querySelectorAll('.thumbnail-image').forEach(function(thumbnail) {
      thumbnail.addEventListener('click', function() {
        document.getElementById('mainImage').src = this.src;
      });
    });
  });