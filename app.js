const gifts = document.querySelectorAll('.gift-img');
const helperTexts = document.querySelectorAll(".helper-text")

const code = "123456";
const boxToPick = code ? Math.floor(Math.random() * 5 ) : null

gifts.forEach( (e, i) => {
    e.addEventListener("click", () => {
      helperTexts[i].textContent = boxToPick !== null && boxToPick === i ? code : "INVALID"; 
    }, {once: true})
})

gifts[boxToPick].addEventListener("click", (e) => {
  e.target.textContent = code
})

console.log(gifts[boxToPick])