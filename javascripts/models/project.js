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
    <form id="project_form">
      <div class="input-feild">
        <label for="name">Project Name</label>
        <input type="text" name="name" id="name"><br>
      </div>
      <div class="input-feild">
        <label for="lead-name">Team Lead </label>
        <input type="text" name="lead-name" id="lead-name"><br>
      </div>
      <div class="input-feild">
        <label for="description">Project Description</label><br>
        <textarea name="description" id="description" cols="30" rows="5"></textarea>
      </div>
      <input type="submit" value="Create Project">
    </form>
    `;
  }

  static editFormTemplate(project) {
    return `
    <h3>Edit Project</h3>
    <form id="project_form" data-id="${project.id}">
    <div class="input-feild">
    <label for="name">Project Name</label>
    <input type="text" name="name" id="name" value="${project.name}"><br>
    </div>
    <div class="input-feild">
    <label for="description">Description</label><br>
    <textarea name="description" id="description" cols="30" rows="5">${project.description}</textarea>
    </div>
    <input type="submit" value="Edit">
    </form>
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
    fetch(baseUrl+"/projects", {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(strongParams),
      method: "POST"
    })
      .then( function(resp) {
        return resp.json();
      })
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
  
    fetch(baseUrl + "/projects/" + id, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(strongParams)
    })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(data) {
      let p = Project.all.find(function(p) {
        return p.id == data.id;
      })
      let idx = Project.all.indexOf(p);
      Project.all[idx] = new Project(data);
      alert(`${Project.name} was edited`)
      Project.renderProjects();
    })
  }

  static deleteProject(e) {
    e.preventDefault();
    
    let id = e.target.dataset.id;
  
    fetch(baseUrl + "/projects/" + id, {
      method: "DELETE"
    })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(data) {
  
      Project.all = Project.all.filter(function(project) {
        return project.id !== data.id;
      })
      Project.renderProjects();
    });
  }
}