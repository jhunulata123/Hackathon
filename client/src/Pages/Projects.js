import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "pending",
    module: "",
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const getProjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/Projects/fetchallProjects",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleAddProject = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/Projects/addProject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(newProject),
      });

      const project = await response.json();
      setProjects([...projects, project]);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Add a Project
        </Button>


        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group mb-3">
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                name="title"
                value={newProject.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Description:</label>
              <textarea
                className="form-control"
                placeholder="Enter description"
                name="description"
                value={newProject.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group mb-3">
              <label>Start Date:</label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={newProject.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>End Date:</label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={newProject.endDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Status:</label>
              <select
                className="form-control"
                name="status"
                value={newProject.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label>Module:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter module"
                name="module"
                value={newProject.module}
                onChange={handleChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddProject}>
              Add Project
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div style={{ display: "flex", padding: "100px", gap: "50px" }}>
        
        {projects.map((project) => (
          <Card style={{ width: "18rem" }} key={project._id}>
           
            <Card.Body>
              <Card.Title>{project.title}</Card.Title>
              <Card.Text>{project.description}</Card.Text>
              <Card.Text>
                <strong>Start Date:</strong>{" "}
                {new Date(project.startDate).toLocaleDateString()}
              </Card.Text>
              <Card.Text>
                <strong>End Date:</strong>{" "}
                {new Date(project.endDate).toLocaleDateString()}
              </Card.Text>
              <Card.Text>
                <strong>Status:</strong> {project.status}
              </Card.Text>
              <Card.Text>
                <strong>Module:</strong> {project.module}
              </Card.Text>
            </Card.Body>
            <div>
            <Button className="mx-2 mb-2" >EDIT</Button>
            <Button className="mx-2 mb-2">Delete</Button>
            </div>
          </Card>
        ))}
      </div>
      </>
  );
};

export default Projects;