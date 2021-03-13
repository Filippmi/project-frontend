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
  
    editLink.addEventListener("click", editProject);
    deleteLink.addEventListener("click", deleteProject);
  
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

  static renderProjects() {
    // resetMain();
    main().innerHTML = Project.projectsTemp();
  
    Project.all.forEach(project => project.render());
    
  }
}
