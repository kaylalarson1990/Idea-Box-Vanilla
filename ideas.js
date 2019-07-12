class Idea {
  constructor(id, title, body) {
    this.id = id;
    this.title = title;
    this.body = body;
  }

  saveToStorage() {
    const stringifiedIdeas = JSON.stringify(ideas);
    localStorage.setItem("savedIdeas", stringifiedIdeas);
  };
}
