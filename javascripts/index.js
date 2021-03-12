let projects = [];
let leads = []
const baseUrl = "http://localhost:3000"

function main() {
  return document.getElementById("main");
}

function nameInput() {
  return document.getElementById('name');
}

function descriptionInput() {
  return document.getElementById('description');
}

function pForm() {
  return document.getElementById("project_form");
}

// functions for Links
function pFormLink() {
  return document.getElementById("pform-link");
}
function projectsLink() {
  return document.getElementById("my-projects");
}
function newLeadLink() {
  return document.getElementById("lead-form-link")
}
function allLeads() {
  return document.getElementById("all-leads-link")
}

// Lead functions
function leadNameInput() {
  return document.getElementById("lead-name");
}
function leadEmailInput() {
  return document.getElementById("lead-email");
}
function leadForm() {
  return document.getElementById("lead-form")
}




// fetches to the backend
function getProjects() {
  fetch(baseUrl+'/projects')
  .then(function(resp) {
    return resp.json();
  })
  .then(function(data) {
    projects = data
  });
}

function getLeads() {
  fetch(baseUrl+'/leads')
  .then(function(resp) {
    return resp.json();
  })
  .then(function(data) {
    leads = data
  });
}

function resetFormInputs() {
  titleInput().value = "";
  descriptionInput().value = "";
}

function resetLeadInputs() {
  leadNameInput().value = "";
  leadEmailInput().value = "";
}

function resetMain() {
  main().innerHTML = "";
}

function projectFormTemplate() {
  return `
  <h3>Create Project</h3>
  <form id="project_form">
    <div class="input-feild">
      <label for="name">Project Name</label>
      <input type="text" name="name" id="name"><br>
    </div>
    <div id="selection">
      <label for="lead">Team Lead</label>
      <select default="select">
        <option selected disabled hidden>Select</option>
          <option>lead names 1</option>
          <option>lead names 2</option>
          <option>lead names 3</option>
          <option>lead names 4</option>
          <option>lead names 5</option>
      </select>
    </div>
    <div class="input-feild">
      <label for="description">Project Description</label><br>
      <textarea name="description" id="description" cols="30" rows="5"></textarea>
    </div>
    <input type="submit" value="Create Project">
  </form>
  `;
}

function editFormTemplate(project) {
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

function projectsTemp() {
  return `
  <h3>Projects</h3>
  <div id="projects">
  </div>
  `
}

function leadsTemp() {
  return `
  <h3>Team Leads</h3>
  <div id="leads">
  </div>
  `
}

function submitLeadForm(e) {
  e.preventDefault();

  let strongParams = {
    lead: {
      name: leadNameInput().value,
      email: leadEmailInput().value
    }
  }
  fetch(baseUrl+"/leads", {
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
  .then( function(lead) {
    leads.push(lead)
    renderLeads();
  })
}

function renderLeads() {
  main().innerHTML = leadsTemp();
  leads.forEach( function(lead) {
    renderLead(lead)
  })
}

function leadFormTemplate() {
  return `
  <h3>Create a Team Lead</h3>
  <form id="lead-form">
    <div class="input-field">
      <label for="lead-name">Name:</label>
      <input type="text" name="lead-name" id="lead-name">
    </div>
    <div class="input-field">
      <label for="lead-email">Email:</label>
      <input type="text" name="lead-email" id="lead-email">
    </div>
    <input type="submit" value="Create">
  </form>
  `
}

function renderLead(lead) {
  const leadDiv = document.getElementById("leads");
  const div = document.createElement("div");
  const h4 = document.createElement("h4");
  const p = document.createElement("p");

  h4.innerText = `Lead: ${lead.name}`;
  p.innerText = `Lead Email: ${lead.email}`;

  div.append(h4, p);
  leadDiv.appendChild(div);
}
    
function renderProject(project) {
  const projectsDiv = document.getElementById("projects");
  const div = document.createElement("div");
  const h4 = document.createElement("h4");
  const p = document.createElement("p");
  // const leadName = document.createElement("p")
  // const leadEmail = document.createElement("p")
  const deleteLink = document.createElement("a")
  const editLink = document.createElement("a")

  editLink.dataset.id = project.id
  editLink.setAttribute("href", "#")
  editLink.innerText = "Edit"
  
  deleteLink.dataset.id = project.id
  deleteLink.setAttribute("href", "#")
  deleteLink.innerText = "Delete"

  editLink.addEventListener("click", editProject);
  deleteLink.addEventListener("click", deleteProject);

  h4.innerText = `Project Name: ${project.name}`;
  // leadName.innerText = `Lead: ${project.lead.name}`;
  // leadEmail.innerText = `Lead Email: ${project.lead.email}`;
  p.innerText = `Short description: ${project.description}`;

  div.append(h4, p, editLink, deleteLink);
  projectsDiv.appendChild(div);

}

function editProject(e) {
  e.preventDefault();
  const id = e.target.dataset.id;

  const project = projects.find(function(project) {
    return project.id == id;
  })

  renderEditForm(project);
}

function deleteProject(e) {
  e.preventDefault();
  
  let id = e.target.dataset.id;

  fetch(baseUrl + "/projects/" + id, {
    method: "DELETE"
  })
  .then(function(resp) {
    return resp.json();
  })
  .then(function(data) {

    projects = projects.filter(function(project) {
      return project.id !== data.id;
    })
    renderProjects();
  });
}

function renderLeadForm() {
  resetMain();
  main().innerHTML = leadFormTemplate();
  leadForm().addEventListener("submit", submitLeadForm);
}
function renderPForm() {
  resetMain();
  main().innerHTML = projectFormTemplate();
  pForm().addEventListener("submit", submitPForm);
}

function renderEditForm(project) {
  resetMain();
  main().innerHTML = editFormTemplate(project);
  pForm().addEventListener("submit", submitEditForm);
}

function submitEditForm(e) {
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
  .then(function(project) {
    let p = projects.find(function(p) {
      return p.id == project.id;
    })
    let idx = projects.indexOf(p);
    projects[idx] = project;
    alert(`${project.name} was edited`)
    renderProjects();
  })
}

function renderProjects() {
  // resetMain();
  main().innerHTML = projectsTemp();

  projects.forEach( function(project) {
    renderProject(project)
  })
}

function submitPForm(e) {
  e.preventDefault();

  let strongParams = {
    project: {
      name: nameInput().value,
      description: descriptionInput().value,
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
    .then( function(project) {
      projects.push(project)
      renderProjects();
    })

}
//lead links
function leadLinkEvent() {
  newLeadLink().addEventListener("click", function(e) {
    e.preventDefault();
    renderLeadForm();
  })
}
function allLeadsLinkEvent() {
  allLeads().addEventListener("click", function(e) {
    e.preventDefault();
    renderLeads();
  })
}

//form links
function formLinkEvent() {
  pFormLink().addEventListener("click", function(e) {
    e.preventDefault();

    renderPForm();
  })
}
function myProjectsLinkEvent() {
  projectsLink().addEventListener("click", function(e) {
    e.preventDefault();

    renderProjects();
  });
}

document.addEventListener("DOMContentLoaded", function() {
  getLeads();
  getProjects();
  leadLinkEvent();
  allLeadsLinkEvent();
  formLinkEvent();
  myProjectsLinkEvent();
  // renderPForm();
})