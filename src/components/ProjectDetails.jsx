
import { useParams, Link } from 'react-router-dom'

function ProjectDetails({ projects }) {
  const { id } = useParams()

  const project = projects.find(
    (item) => item.id.toString() === id
  )

  if (!project) {
    return (
      <main className="details-container">
        <h2>Project not found</h2>
        <Link to="/">Back to Projects</Link>
      </main>
    )
  }

  return (
    <main className="details-container">
      <Link to="/">← Back to Projects</Link>

      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </main>
  )
}

export default ProjectDetails
