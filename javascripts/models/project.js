class Project{
  static all = []

  constructor(attribute) {
    this.id = attribute.id;
    this.name = attribute.name;
    this.description = attribute.description;
    this.lead = attribute.lead;
  }

  render() {
    const projectsDiv = document.getElementById("projects");
    const div = document.createElement("div");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    const leadName = document.createElement("p")
    const deleteLink = document.createElement("a")
    const editLink = document.createElement("a")
  
    editLink.dataset.id = this.id
    editLink.setAttribute("href", "#")
    editLink.innerText = "Edit"
    
    deleteLink.dataset.id = this.id
    deleteLink.setAttribute("href", "#")
    deleteLink.innerText = "Delete"
  
    editLink.addEventListener("click", Project.editProject);
    deleteLink.addEventListener("click", Project.deleteProject);
  
    div.classList.add('card')
    h4.innerText = `Project Name: ${this.name}`;
    leadName.innerText = `Team Lead: ${this.lead.name}`;
    p.innerText = `Short description: ${this.description}`;
  
    div.append(h4, leadName, p, editLink, deleteLink);
    projectsDiv.appendChild(div);
  
  }
  
  save() {
    Project.all.push(this)
  }

  static create(attribute) {
    let project = new Project(attribute);
    project.save();
    return project;
  }
  
  static createFromCollection(collection) {
    collection.forEach(data => Project.create(data))
  }

  static projectsTemp() {
    return `
    <h3>Projects</h3>
    <div id="projects">
    </div>
    `
  }

  static projectFormTemplate() {
    return `
    <h3>Create Project</h3>
    <div class="container">
      <form id="project_form">
        <div class="project-name">
          <input type="text" name="name" id="name" placeholder="Project Name...">
        </div>
        <div class="input-feild">
          <input type="text" name="lead-name" id="lead-name" placeholder="Lead Name...">
        </div>
        <div class="input-feild">
          <input type="text" name="description" id="description" placeholder="Description...">
        </div>
        <input type="submit" value="Create Project">
      </form>
    </div>
    `;
  }

  static editFormTemplate(project) {
    return `
    <h3>Edit Project</h3>
    <div class="container">
      <form id="project_form" data-id="${project.id}">
      <div class="input-feild">
        <input type="text" name="name" id="name" value="${project.name}"><br>
      </div>
      <div class="input-feild">
        <input type="text" name="description" id="description" value="${project.description}">
      </div>
        <input type="submit" value="Edit">
      </form>
    </div>
    `;
  }

  static renderPForm() {
    resetMain();
    main().innerHTML = Project.projectFormTemplate();
    pForm().addEventListener("submit", Project.submitPForm);
  }

  static renderEditForm(project) {
    resetMain();
    main().innerHTML = Project.editFormTemplate(project);
    pForm().addEventListener("submit", Project.submitEditProjectForm);
  }

  static renderProjects() {
    // resetMain();
    main().innerHTML = Project.projectsTemp();
  
    Project.all.forEach(project => project.render());
    
  }

  static editProject(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
  
    const project = Project.all.find(function(project) {
      return project.id == id;
    })
  
    Project.renderEditForm(project);
  }

  static submitPForm(e) {
    e.preventDefault();
  
    let strongParams = {
      project: {
        name: nameInput().value,
        description: descriptionInput().value,
        lead_attributes: leadNameInput().value
      }
    }
    Api.post("/projects", strongParams)
      .then( function(data) {
        Project.create(data)
        Project.renderProjects();
    })
  }

  static submitEditProjectForm(e) {
    e.preventDefault();
  
    let strongParams = {
      project: {
        name: nameInput().value,
        description: descriptionInput().value
      }
    }
    const id = e.target.dataset.id;
    
    Api.patch("/projects/" + id, strongParams)
      .then(function(data) {
        // Selects the project from the projects array
        let p = Project.all.find((p) => p.id == data.id);
        //gets the index of the selected project
        let idx = Project.all.indexOf(p);
        //updates the selected index with the new project
        Project.all[idx] = new Project(data);
        //renders the projects and the updated project
        Project.renderProjects();
      })
  }

  static async getProjects() {

    const data = await Api.get("/projects");

    Project.createFromCollection(data)
    Project.renderProjects();
  
  }

  static async deleteProject(e) {
    if (confirm("Are you sure you want to delete this project?")) {
      e.preventDefault();
    
      let id = e.target.dataset.id;
  
      const data = await Api.delete("/projects/" + id)
  
      Project.all = Project.all.filter(function(project) {
        return project.id !== data.id;
      })
      Project.renderProjects();
    }
  }
}