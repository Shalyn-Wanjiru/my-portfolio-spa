
import { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import Header from './components/Header'
import AddProjectForm from './components/AddProjectForm'
import SearchBar from './components/SearchBar'
import ProjectDetails from './components/ProjectDetails'
import './App.css'

function App() {
  const [projects, setProjects] = useState(() => {
  const savedProjects = localStorage.getItem('projects')

  if (savedProjects) {
    return JSON.parse(savedProjects)
  }

  return [
    { id: 1, title: 'Project 1', description: 'This is my first project.' },
    { id: 2, title: 'Project 2', description: 'This is my second project.' },
    { id: 3, title: 'Project 3', description: 'This is my third project.' }
  ]
})

  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
 useEffect(() => {
  localStorage.setItem('projects', JSON.stringify(projects))
}, [projects])

  function addProject(newProject) {
    setProjects((previousProjects) => [
      ...previousProjects,
      newProject
    ])
  }

  async function loadSampleProjects() {
  try {
    setIsLoading(true)
    setError('')

    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_limit=3'
    )

    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }

    const data = await response.json()

    const fetchedProjects = data.map((post) => ({
      id: `api-${post.id}`,
      title: post.title,
      description: post.body
    }))

    setProjects((previousProjects) => [
      ...previousProjects,
      ...fetchedProjects.filter(
        (newProject) =>
          !previousProjects.some(
            (project) => project.id === newProject.id
          )
      )
    ])
  } catch (err) {
    setError('Could not load projects. Please check your internet connection.')
  } finally {
    setIsLoading(false)
  }
}

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <main className="main-content">
                <h2>Add a New Project</h2>

                <AddProjectForm onAddProject={addProject} />

                <h2>My Projects</h2>

                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                />
                <button
  onClick={loadSampleProjects}
  disabled={isLoading}
  className="load-projects-button"
>
  {isLoading ? 'Loading Projects...' : 'Load Sample Projects'}
</button>

{error && <p className="error-message">{error}</p>}

                <div className="project-list">
                  {filteredProjects.map((project) => (
                    <Link
                      to={`/projects/${project.id}`}
                      className="project-card"
                      key={project.id}
                    >
                      <div className="project-image">
  Project Preview
</div>

<h3>{project.title}</h3>
<p>{project.description}</p>
<span>View Project →</span>
                    </Link>
                  ))}
                </div>

                {filteredProjects.length === 0 && (
                  <p>No projects found.</p>
                )}
              </main>
            }
          />

          <Route
            path="/projects/:id"
            element={<ProjectDetails projects={projects} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
