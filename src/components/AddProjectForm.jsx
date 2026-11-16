
import { useState } from 'react'

function AddProjectForm({ onAddProject }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!title.trim() || !description.trim()) {
      return
    }

    onAddProject({
      id: Date.now(),
      title: title,
      description: description
    })

    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />

      <button type="submit">Add Project</button>
    </form>
  )
}

export default AddProjectForm
