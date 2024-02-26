//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function() {
  // Retrieve the form and its elements
  const form = document.querySelector('form');
  const fontSizeInput = document.getElementById('fontsize');
  const fontColorInput = document.getElementById('fontcolor');

  // Set initial values from cookies or default values
  fontSizeInput.value = getCookie('fontSize') || 16;
  fontColorInput.value = getCookie('fontColor') || '#000000';

  // Add event listener to the form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the values from the form inputs
    const fontSize = fontSizeInput.value;
    const fontColor = fontColorInput.value;

    // Set the font size and color as CSS variables
    document.documentElement.style.setProperty('--fontsize', `${fontSize}px`);
    document.documentElement.style.setProperty('--fontcolor', fontColor);

    // Save the preferences as cookies
    setCookie('fontSize', fontSize, 30); // Cookie expires in 30 days
    setCookie('fontColor', fontColor, 30); // Cookie expires in 30 days
  });
});

// Function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie value
function getCookie(name) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for(let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
}
