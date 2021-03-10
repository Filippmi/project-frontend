function main() {
  return document.getElementById("main");
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