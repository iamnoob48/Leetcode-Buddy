let count = 0;
document.addEventListener("DOMContentLoaded", function() {
    const textInput = document.querySelector("#textinput");
    const submitInput = document.querySelector("#submitBtn")
    
    const clicked = document.querySelector("#hintbutton");
    const display = document.querySelector(".Response"); 

    clicked.addEventListener("click", async() => {
        count++;
        chrome.tabs.query({ active: true, currentWindow: true }, async([tab]) => {
          chrome.tabs.sendMessage(tab.id, { type: "problem_get_data" }, async(response) => {
            if (chrome.runtime.lastError) {
              console.error(" runtime.lastError:", chrome.runtime.lastError.message);
              display.textContent = "Could not connect to content script.";
              return;
            }
      
            if (!response) {
              console.error("No response received. Is content script injected?");
              display.textContent = "No response received.";
              return;
            }
      
            const { title, desc } = response;
            textPrompt = `${title}\n\n${desc}`;
            const hintDisplay = await getHint(textPrompt, count, "AIzaSyDs8O_Wq0HEDMhafrkfNO1OcPt1UnuBVcY")

            display.textContent = hintDisplay;
          });
        });
      });
      async function getHint(text, count, apiKey) {
        submitInput.addEventListener('click', ()=>{
            if(count<=3){
                return display.textContent = "You atleast need 3 hints";
            }
        })
    
        const prompt = `You are a professional DSA tutor. Analyse this LeetCode problem carefully and give a helpful hint (not the solution) to guide the user like a mentor. Problem:\n${text}`;
    
        const fetchData = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            })
        });
    
        const json = await fetchData.json();
        const hint = json.candidates?.[0]?.content?.parts?.[0]?.text;
    
        return hint || "No hint generated.";
    }
      
});


