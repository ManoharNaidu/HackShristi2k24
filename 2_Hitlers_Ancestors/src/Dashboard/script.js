document.addEventListener("DOMContentLoaded", function() {
  // Add event listeners or any other JavaScript functionality here
  
  // Example: Toggle dark mode
  const modeSwitch = document.querySelector('.mode-switch');
  const appContainer = document.querySelector('.app-container');
  modeSwitch.addEventListener('click', function() {
    appContainer.classList.toggle('dark');
  });
  
  // Example: Toggle messages section
  const messagesBtn = document.querySelector('.messages-btn');
  const messagesSection = document.querySelector('.messages-section');
  const messagesCloseBtn = document.querySelector('.messages-close');
  messagesBtn.addEventListener('click', function() {
    messagesSection.classList.toggle('show');
  });
  messagesCloseBtn.addEventListener('click', function() {
    messagesSection.classList.remove('show');
  });
  
  // Add more JavaScript functionality as needed

  // Select the SVG paths within the div with class 'dust-particle'
  const svgPaths = document.querySelectorAll('.dust-particle path');

  // Function to change the stroke color of SVG paths
  function changeStrokeColor(color) {
    svgPaths.forEach(path => {
      path.setAttribute('stroke', color);
    });
  }

  // Example: Change stroke color to red
  changeStrokeColor('red');
});
