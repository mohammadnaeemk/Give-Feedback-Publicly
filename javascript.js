const textAreaEL = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const submitbtnEL = document.querySelector(".submit-btn");
const ListEL = document.querySelector(".hashtags");
const formEL = document.querySelector(".form");
const feedbacksLE = document.querySelector(".feedbacks");
const spinnerLE = document.querySelector(".spinner");
counterEl.textContent = 150;
let matn = "#";
let Flag = false;

textAreaEL.addEventListener("input", function () {
  counterEl.textContent = 150 - textAreaEL.value.length;
});

const classChanger = function (className) {
  document.querySelector(".form").classList.add(className);
  setTimeout(() => {
    document.querySelector(".form").classList.remove(className, 200);
  }, 2000);
};
const submitBtnHandler = function () {
  matn = "#";
  let text = String(textAreaEL.value);
  if (text.includes("# ")) {
    Flag = false;
    classChanger("red");
  } else if (!text.includes("#")) {
    classChanger("red");
    Flag = false;
  } else {
    classChanger("green");
    Flag = true;
    let i = text.indexOf("#") + 1;

    while (true) {
      if (text[i] != " " && text[i] != "" && text[i] != undefined) {
        matn += text[i];
        ++i;
      } else {
        break;
      }
    }

    if (matn.length >= 2) {
      ListEL.insertAdjacentHTML(
        "beforeend",
        "<li class='hashtags__item'><button class='hashtag'>" +
          matn +
          "</button></li>"
      );
    }
  }
};
const SubmitHandler = (item) => {
  item.preventDefault();
  //input text
  let txt = textAreaEL.value;
  // hashtag = matn
  // companyName
  let companyName = matn.substring(1).toUpperCase();
  // first letter
  let companyLetter = companyName.substring(0, 1).toUpperCase();
  let time = 0;
  let vote = 0;
  const feedHTML = `
  <li class="feedback">
          <button class="upvote">
              <i class="fa-solid fa-caret-up upvote__icon"></i>
              <span class="upvote__count">${vote}</span>
          </button>
          <section class="feedback__badge">
              <p class="feedback__letter">${companyLetter}</p>
          </section>
          <div class="feedback__content">
              <p class="feedback__company">${companyName}</p>
              <p class="feedback__text">${txt}</p>
          </div>
          <p class="feedback__date">${time}</p>
      </li>
  `;
  if (Flag == true) {
    feedbacksLE.insertAdjacentHTML("beforeend", feedHTML);
    textAreaEL.value = "";
    counterEl.textContent = 150;
    spinnerLE.style="display : none;"
  } else {
    return;
  }
};

submitbtnEL.addEventListener("click", submitBtnHandler);

formEL.addEventListener("submit", SubmitHandler);
