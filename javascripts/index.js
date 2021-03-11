const projects = [
  {title: "Title 1", description: "Desc1"},
  {title: "Title 2", description: "Desc2"},
  {title: "Title 3", description: "Desc3"},
  {title: "Title 4", description: "Desc4"},
];

function main() {
  return document.getElementById("main");
}

function titleInput() {
  return document.getElementById('title');
}

function descriptionInput() {
  return document.getElementById('description');
}

function pForm() {
  return document.getElementById("project_form");
}

function resetFormInputs() {
  titleInput().value = "";
  descriptionInput().value = "";
}

function resetMain() {
  main().innerHTML = "";
}

function projectFormTemplate() {
  return `
  <h3>Create Project</h3>
    <form id="project_form">
      <div class="input-feild">
        <label for="title">Project title</label>
        <input type="text" name="title" id="title"><br>
      </div>
      <div class="input-feild">
        <label for="description">Description</label><br>
        <textarea name="description" id="description" cols="30" rows="5"></textarea>
      </div>
      <input type="submit" value="Create Project">
    </form>
  `;
}

function projectsTemp() {
  return `
  <h3>My Projects</h3>
  <div id="projects">
  </div>
  `
}

function renderProject(project) {
  const projectsDiv = document.getElementById("projects");
  const div = document.createElement("div");

  const h4 = document.createElement("h4");
  h4.innerText = project.title;

  const p = document.createElement("p");
  p.innerText = project.description;

  div.append(h4, p)
  projectsDiv.appendChild(div);
}

function renderPForm() {
  resetMain();
  main().innerHTML = projectFormTemplate();
  pForm().addEventListener("submit", submitPForm);
}

function renderProjects() {
  resetMain();
  main().innerHTML = projectsTemp();

  projects.forEach( function(project) {
    renderProject(project)
  })
}

function submitPForm(e) {
  e.preventDefault();

  projects.push ({
    title: titleInput().value,
    description: descriptionInput().value,
  });

  resetFormInputs();
}

document.addEventListener("DOMContentLoaded", function() {
  // renderPForm();
  renderProjects()
})