import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './Login.css';



const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values) => {
    const isValid = loginUser(values);
    if (!isValid) {
      setError('Invalid email or password');
    } else {
      alert('Login successful!');
      navigate('/todolist'); 
      
    }
  };

  return (
    <div className='container-fluid' >
      
      <Card style={{ width: '30rem' }} className='card'>
      <h2 className='heading'>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
            
          <Form>
            
            <BootstrapForm.Group>
              <BootstrapForm.Label>Email</BootstrapForm.Label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </BootstrapForm.Group>

            <BootstrapForm.Group>
              <BootstrapForm.Label>Password</BootstrapForm.Label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </BootstrapForm.Group>
            {error && <p className="text-danger">{error}</p>}
            
            <div className="d-grid">
            <Button type="submit" className="buttonLogin mt-3">Login</Button>
            </div>
          </Form>
         
        )}
      </Formik>

      <div className='link-container'>
          <a href="/register" className='link'>Don't have an account? Register here</a>
        </div>
      </Card>
    </div>
  );
};

export default Login;