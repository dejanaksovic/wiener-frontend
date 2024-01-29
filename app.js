const gifts = document.querySelectorAll('.gift-img');
const helperTexts = document.querySelectorAll(".helper-text");
const URL = "https://wiener-backend.onrender.com";
const errorText = document.querySelector("#error-text");

let code;
let boxToPick;
let boxesClickedCount = 0;

const getCode = async () => {
  const res = await fetch(`${URL}/giveaway/one`);
  const data = await res.json();

  if(data.code && data.code.length !== 0)
    code = data.code;
  boxToPick = code ? Math.floor(Math.random() * 5 ) : null;

  if(data?.err)
    errorText.textContent = data.err
  
  gifts.forEach( (e, i) => {
    e.addEventListener("click", () => {
      helperTexts[i].textContent = boxToPick !== null && boxToPick === i ? code : "INVALID";
      boxesClickedCount+=1;
      if(boxesClickedCount === 5)
        errorText.classList.remove("hidden");
    }, {once: true})
})

  console.log(data);
}

getCode();

console.log(gifts[boxToPick]);