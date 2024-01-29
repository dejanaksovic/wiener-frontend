const gifts = document.querySelectorAll('.gift-img');
const helperTexts = document.querySelectorAll(".helper-text");
let code;
let boxToPick;
const URL = "https://wiener-backend.onrender.com";

const getCode = async () => {
  const res = await fetch(`${URL}/giveaway/one`);
  const data = await res.json();

  if(data.code && data.code.length !== 0)
    code = data.code;


  boxToPick = code ? Math.floor(Math.random() * 5 ) : null;
  
  gifts.forEach( (e, i) => {
    e.addEventListener("click", () => {
      helperTexts[i].textContent = boxToPick !== null && boxToPick === i ? code : "INVALID"; 
    }, {once: true})
})

  console.log(data);
}

getCode();

console.log(gifts[boxToPick]);