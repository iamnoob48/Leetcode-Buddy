document.addEventListener("DOMContentLoaded", function() {
    const textInput = document.querySelector("#textinput");
    
    const clicked = document.querySelector("#submitBtn");
    const display = document.querySelector(".Response"); 

    clicked.addEventListener("click", () => {
        const value = textInput.value;
        console.log(value);
        display.textContent = value;
  
    });
});
