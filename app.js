const gifts = document.querySelectorAll('.gift-img');
const helperTexts = document.querySelectorAll(".helper-text");
const URL = "http://localhost:3000";
const errorText = document.querySelector("#error-text");

let code;
let boxToPick;
let boxesClickedCount = 0;

const getCode = async () => {
  let res;
  let data;

  try {
  res = await fetch(`${URL}/giveaway/one`);
  data = await res.json();
  }
  catch(err) {
    errorText.textContent = "Greška pri komunikaciji sa serverom, kontaktirajte administratora";
    errorText.classList.remove("hidden");
  }

  let interval;

  if(data.code && data.code.length !== 0)
    code = data.code;
  boxToPick = code ? Math.floor(Math.random() * 5 ) : null;

  const err = data.err;
  let errorTextBase;
  let timeRemaining;

  if(err) {
    const errorArray = err.split(" ");
    errorTextBase = errorArray.splice(0, errorArray.length - 1);
    timeRemaining = Number(errorArray);
    errorText.textContent = err;
  }

  if(!isNaN(timeRemaining)) {
    interval = setInterval(() => {
      const seconds = Math.floor(timeRemaining/1000) % 60;
      const minutes = Math.floor(timeRemaining/1000/60)%60;
      const hours = Math.floor(timeRemaining/1000/60/60);

      errorText.textContent = `${errorTextBase.join(" ")} ${hours ? `${hours}:` : ""} ${minutes ? `${minutes}:` : ""} ${seconds}`;

      timeRemaining-=1000;
    }, 1000)
  }

  if(timeRemaining <= 0)
    clearInterval(interval);
  
  gifts.forEach( (e, i) => {
    e.addEventListener("click", () => {
      helperTexts[i].textContent = boxToPick !== null && boxToPick === i ? code : "INVALID";
      boxesClickedCount+=1;
      if(boxesClickedCount === 5)
        errorText.classList.remove("hidden");
    }, {once: true})
})

}

getCode();

console.log(gifts[boxToPick]);