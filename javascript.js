const textAreaEL = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const submitbtnEL = document.querySelector(".submit-btn");
const ListEL = document.querySelector(".hashtags");
const formEL = document.querySelector(".form");
const feedbacksLE = document.querySelector(".feedbacks");
const spinnerLE = document.querySelector(".spinner");
const hashtagListEL = document.querySelector('.hashtags');
counterEl.textContent = 150;
let matn = "#";
let Flag = false;
let list;
let listNumber;

const URLlink = "https://bytegrad.com/course-assets/js/1/api/feedbacks";
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
    spinnerLE.remove();
  } else {
    return;
  }
  let ob = {
    upvoteCount : vote ,
    daysAgo : time ,
    company: companyName,
    badgeLetter : companyLetter,
    text : txt
  }
  fetch(URLlink, {
    method: 'POST',
    body: JSON.stringify(ob),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
}).then(response => {
    if (!response.ok) {
        console.log('Something went wrong' + response);
        return;
    }
    console.log('Successfuly submitted');
}).catch(error => console.log(error));
};
const printer = function () {
  for (let index = 0; index < listNumber; index++) {
    Company = list[index].company;
    Letter = list[index].badgeLetter;
    Vote = list[index].upvoteCount;
    Days = list[index].daysAgo;
    Text = list[index].text;

    feedHTML = `
    <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${Vote}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${Letter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${Company}</p>
                <p class="feedback__text">${Text}</p>
            </div>
            <p class="feedback__date">${Days}</p>
        </li>
    `;
    
    feedbacksLE.insertAdjacentHTML("beforeend", feedHTML);
  }
};
submitbtnEL.addEventListener("click", submitBtnHandler);

formEL.addEventListener("submit", SubmitHandler);

//vars
let Company, Letter, Vote, Days, Text;
let feedHTML;
fetch(URLlink)
  .then((info) => {
    return info.json();
    
  })
  .then((data) => {
    list = data.feedbacks;
    listNumber = list.length;
    printer();
    
      if (document.querySelector(".feedbacks").getElementsByTagName("li").length > 0) {
        spinnerLE.remove();
        
      }
    ;
  
    
  }).catch(error => {
    alert("error cod is : " + error.message)
  });


  const click = event => {

    const clickedEL = event.target;

    const upvoteEL = clickedEL.className.includes('upvote');
    if (upvoteEL) {
       const upvoteBtnEl = clickedEL.closest('.upvote');
       upvoteBtnEl.disabled=true;

       const upvoteCountEl = upvoteBtnEl.querySelector('.upvote__count');
       let upvoteCount = +upvoteBtnEl.textContent;

       upvoteCountEl.textContent = ++upvoteCount;
    }
    else {
       clickedEL.closest('.feedback').classList.toggle('feedback--expand');
    }
};

feedbacksLE.addEventListener('click', click);



const hashtagClickHandler = event => {
  const clickedEl = event.target;
  
  if (clickedEl.className === 'hashtags') return;

  const companyNameFromHastag = clickedEl.textContent.substring(1).trim();
 
  feedbacksLE.childNodes.forEach(childNode => {
      if (childNode.nodeType  === 3 ) return;
      const companyNameFromFeedbackItem = childNode.
          querySelector('.feedback__company')
          .textContent.toLowerCase().trim();

      if(companyNameFromHastag.toLowerCase().trim() !== companyNameFromFeedbackItem)
          {
              childNode.remove();
          }
  });

};
hashtagListEL.addEventListener('click', hashtagClickHandler);