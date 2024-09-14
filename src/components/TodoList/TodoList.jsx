import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Card } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './TodoList.css';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navbar/Navbar';

const Dashboard = () => {
  // managing the todos list
  const [todos, setTodos] = useState([]);
  // State for the todo currently edit
  const [editTodo, setEditTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' 'edit' popup
  const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate('/');
//   };

  // Validation schema using Yup
  const todoValidationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  // Load todos from local storage 
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos'); // Retrieve todos from local storage
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos)); // Parse and set the todos in state if available
      } catch (error) {
        console.error('Failed to parse todos from local storage:', error);
        setTodos([]); // Fallback to empty array if parsing fails
      }
    }
  }, []);

  // Save todos to local storage 
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos)); // Save todos to local storage as a JSON string
    }
  }, [todos]);

  // Function to handle adding a new todo
  const handleAddTodo = (values) => {
    // Add new todo to the state and set a unique id and default completion status
    setTodos([...todos, { ...values, id: Date.now(), completed: false }]);
    setShowModal(false);
  };

  // Function to handle editing an existing todo
  const handleEditTodo = (values) => {
    // Update the todo in the state by mapping over the todos array and replacing the edited todo
    setTodos(todos.map((todo) => (todo.id === editTodo.id ? { ...editTodo, ...values } : todo)));
    setEditTodo(null); // Clear the editTodo state
    setShowModal(false);
  };

  // Function to handle deleting a todo
  const handleDeleteTodo = (id) => {
    // Filter out the deleted todo from the todos state
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Function to toggle the completion status of a todo
  const handleToggleCompletion = (id) => {
    // Toggle the completed status of the todo in the todos state
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  // Function to show the modal for adding or editing a todo
  const handleShowModal = (todo = null, mode = 'add') => {
    setEditTodo(todo); // Set the todo to be edited
    setModalMode(mode); // Set the mode of the modal add
    setShowModal(true); // Show the modal
  };

  return (
    <>
    <Navigation/>
    <Container fluid="md">
      <Row className="my-2">
        <Col sm={10}>
          {/* <h1>Todo List</h1> */}
        </Col>

        <Col>
          <Button onClick={() => handleShowModal(null, 'add')} className="mb-1 mt-3 m-0 p-2" sm={2}>
            Add Todo
          </Button>
        </Col>

        {/* <Col>
          <Button onClick={handleLogout} variant="danger" className="mb-1 mt-3 m-0 p-2" sm={2}>
            Log Out
          </Button>
        </Col> */}
      </Row>

      <Row>
        {todos.map((todo) => (
          <Col key={todo.id} sm={4} className="mb-4">
            <Card className="todo-card" style={{ width: '22rem' }}>
              <Card.Body className="card-body">
                <Card.Title>
                  {todo.title}
                  <span className={`badge ms-2 ${todo.completed ? 'bg-success' : 'bg-secondary'}`}>
                    {todo.completed ? 'Completed' : 'Incomplete'}
                  </span>
                </Card.Title>
                <Card.Text>{todo.description}</Card.Text>
                <Button variant="info" size="sm" onClick={() => handleToggleCompletion(todo.id)}>
                  {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </Button>
                <Button variant="warning" size="sm" onClick={() => handleShowModal(todo, 'edit')} className="ms-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteTodo(todo.id)} className="ms-2">
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    {/* Modal for adding or editing a todo */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'add' ? 'Add Todo' : 'Edit Todo'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Formik form for adding or editing a todo */}
          <Formik
            initialValues={
              modalMode === 'add'
                ? { title: '', description: '' } // Initial values for adding a todo
                : { title: editTodo?.title || '', description: editTodo?.description || '' } // Initial values for editing a todo
            }
            validationSchema={todoValidationSchema} // Validation schema for form validation
            onSubmit={modalMode === 'add' ? handleAddTodo : handleEditTodo} // Form submission handler
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title">Title</label>
                  <Field name="title" className="form-control" placeholder="Enter title" />
                  <ErrorMessage name="title" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description">Description</label>
                  <Field as="textarea" name="description" className="form-control" placeholder="Enter description" rows="3" />
                  <ErrorMessage name="description" component="div" className="text-danger" />
                </div>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary">
                    {modalMode === 'add' ? 'Add Todo' : 'Save Changes'}
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </Container>
    </>
  );
};

export default Dashboard;