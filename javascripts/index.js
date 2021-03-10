const projects = [];

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


function renderPForm() {
  resetMain();
  main().innerHTML = projectFormTemplate();
  pForm().addEventListener("submit", submitPForm);
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
  renderPForm();
})