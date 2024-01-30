import { useState } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";


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

  function onCancel(data){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    });
  }

  let content; 

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={onCancel}/>
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} />
      {content}
    </main>
  );
}

export default App;
