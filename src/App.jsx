import { useState } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    });
  }

  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const NewProject = {
        ...projectData,
        id: Math.random( ) 
      };

      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, NewProject]
      }
    });
  }

  function handleDelete() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    project => project.id == projectsState.selectedProjectId
  );

  function onCancel(data){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    });
  }

  function handleProjectSelect(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    });
  }

  let content; 

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={onCancel}/>
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  } else {
    content = <SelectedProject project={selectedProject} onDelete={handleDelete}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleProjectSelect}
      />
      {content}
    </main>
  );
}

export default App;
