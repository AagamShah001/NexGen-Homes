document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector(".custom-dropdown");
    const button = dropdown.querySelector(".dropdown-btn");
    const menu = dropdown.querySelector(".dropdown-menu");
    const hiddenInput = dropdown.querySelector("#selected-option");
  
    // Toggle dropdown visibility
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent click from closing instantly
      dropdown.classList.toggle("active");
    });
  
    // Handle option selection
    menu.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        button.innerHTML = `${item.innerText} <span>▼</span>`;
        hiddenInput.value = item.dataset.value;
        dropdown.classList.remove("active");
      });
    });
  
    // Close dropdown if clicked outside
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  });
  