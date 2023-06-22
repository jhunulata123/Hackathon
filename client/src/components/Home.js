import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom";


const Body = () => {
  const navigate = useNavigate()

  return (
    <div  style={{ "display":"flex", "padding": "160px", "gap":"70px"}}
    >
       <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src="../project.png" /> */}
      <Card.Body>
        <Card.Title>Projects</Card.Title>
       
        <Button variant="primary" onClick={()=> navigate(`/projects`)}>Click</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src="../quiz.png" /> */}
      <Card.Body>
        <Card.Title>Quizzes</Card.Title>
       
        <Button variant="primary">Click</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src="../case-studies.png" /> */}
      <Card.Body>
        <Card.Title>Case studies</Card.Title>
        
        <Button variant="primary">Click</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Body;