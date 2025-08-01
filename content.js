alert("content.js is loaded")

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.type === "problem_get_data") {
      const titleElement = document.querySelector(".text-title-large.font-semibold.text-text-primary.dark\\:text-text-primary a");
      const descriptionElements = document.querySelectorAll(".elfjS p");
  
      const title = titleElement ? titleElement.innerText : "Title not found";
      const desc = Array.from(descriptionElements).map(p => p.innerText).join("\n");
  
      sendResponse({ title, desc });
    }
  
    return true;
  });
  