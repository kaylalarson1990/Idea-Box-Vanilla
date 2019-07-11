const searchIdeas = document.querySelector("#search-ideas");
const searchIdeasBtn = document.querySelector(".search-button");
const titleInput = document.querySelector(".title-input");
const bodyInput = document.querySelector(".body-input");
const saveIdeasBtn = document.querySelector("#save-button");
const ideasContainer = document.querySelector("#ideas-container");
const ideaPlaceholder = document.querySelector(".no-ideas-placeholder");

let ideas = JSON.parse(localStorage.getItem("ideasSaved")) || [];
let ideaInstance = new Idea();

if(ideas != []) {
    pageRefresh(ideas)
}

ideasContainer.addEventListener("click", checkBody);
ideasContainer.addEventListener("click", checkTitle);

saveIdeasBtn.addEventListener("click", saveNewIdea);
titleInput.addEventListener("keyup", enableBtn);
bodyInput.addEventListener("keyup", enableBtn);

function checkBody(e) {
  if (e.target.className.includes("idea-card-paragraph")) {
    updateIdeaBody(e);
  }
}

function checkTitle(e) {
  if (e.target.className.includes("idea-card-title")) {
    updateIdeaTitle(e);
  }
}

function saveNewIdea() {
  storeSavedIdea();
  const item = ideas[ideas.length - 1];
  createNewIdeaCard(item);
  clearInputs();
}

function storeSavedIdea(id, title, body) {
  const newIdea = new Idea(Date.now(), titleInput.value, bodyInput.value);
  ideas.push(newIdea);
  const stringifiedIdeas = JSON.stringify(newIdea);
  newIdea.saveToStorage(ideas);
}

function createNewIdeaCard(idea) {
  ideaPlaceholder.classList.add("hidden");
  ideasContainer.innerHTML =
    `<figure class="idea-card" id="idea-card" data-id="${
      idea.id
    }"><header class="idea-card-header">
        <input type="image" src="images/star.svg" class="icons__card--star" width=35px id="star-icon"/>
        <input type="image" src="images/delete.svg" class="icons__card--remove" width=35px id="close-icon"/>
      </header>
        <h2 class="idea-card-title" id="card-title" contenteditable = "true">${
          idea.title
        }</h2>
        <p class="idea-card-paragraph" id="card-paragraph" contenteditable = "true">${
          idea.body
        }</p>
      </figure>
      ` + ideasContainer.innerHTML;
};

function updateIdeaTitle(e) {
  const parsedIdeas = JSON.parse(localStorage.getItem("savedIdeas"));
  const targetId = JSON.parse(e.target.parentElement.dataset.id);
  for (let i = 0; i < parsedIdeas.length; i++) {
    if (parsedIdeas[i].id === targetId) {
      const newIdea = parsedIdeas[i];
      newIdea.title = e.target.textContent;
      parsedIdeas.splice(i, 1, newIdea);
      localStorage.setItem("savedIdeas", JSON.stringify(parsedIdeas));
    }
  }
}

function updateIdeaBody(e) {
  const parsedIdeas = JSON.parse(localStorage.getItem("savedIdeas"));
  const targetId = JSON.parse(e.target.parentElement.dataset.id);
  console.log(e);
  for (let i = 0; i < parsedIdeas.length; i++) {
    if (parsedIdeas[i].id === targetId) {
      const newIdea = parsedIdeas[i];
      newIdea.body = e.target.textContent;
      parsedIdeas.splice(i, 1, newIdea);
      localStorage.setItem("savedIdeas", JSON.stringify(parsedIdeas));
    }
  }
}

function clearInputs() {
  titleInput.value = "";
  bodyInput.value = "";
  saveIdeasBtn.classList.add("disabled");
}

function enableBtn() {
  saveIdeasBtn.classList.remove("disabled");
}

function pageRefresh(ideas) {
  ideas.forEach(item => {
    createNewIdeaCard(item);
  });
}

function onPageLoad() {
  const parsedIdeas = JSON.parse(localStorage.getItem("savedIdeas"));
  const newIdeas = parsedIdeas.map(item => {
    item = new Idea(item.id, item.title, item.body);
    return item;
  });
//   return newIdeas;
}
