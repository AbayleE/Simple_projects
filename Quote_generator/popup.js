document.addEventListener("DOMContentLoaded",()=>{
       const button_lis = document.getElementById("btn-generate");
       const quoteText = document.getElementById("quote");
       
       async function fetchquote(){
          const data = JSON.stringify({
               topic: 'fun'
          });
          
          const xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          
          xhr.addEventListener('readystatechange', function () {
               if (this.readyState === this.DONE) {
                    console.log(this.responseText);
               }

               try{
                    const response = JSON.parse(this.responseText);
                    quoteText.innerText = `"${response.quote}"\n- ${response.author || "Unknown"}`;


               } catch(error){
                    console.log("Error Fetching quote. Try again!");
               }
          });
          
          xhr.open('POST', 'https://pquotes.p.rapidapi.com/api/quote');
          xhr.setRequestHeader('x-rapidapi-host', 'pquotes.p.rapidapi.com');
          xhr.setRequestHeader("x-rapidapi-key", "137a87fffemsh446b7b3ea71f8b1p13a903jsnfb894a4f60f6");
          xhr.setRequestHeader('Content-Type', 'application/json');
          
          xhr.send(data); 
       };
       
       button_lis.addEventListener("click",fetchquote);

});