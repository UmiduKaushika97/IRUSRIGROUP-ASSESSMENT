import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = (values) => {
    registerUser(values);
    navigate('/'); 
    alert('Registration successful!');
  };

  return (
    <div className="register-container">
      <Card style={{ width: '30rem' }} className='register-card'>
      <h2 className='heading'>Register</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <BootstrapForm.Group>
              <BootstrapForm.Label>Name</BootstrapForm.Label>
              <Field name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </BootstrapForm.Group>

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

            <div className="d-grid">
            <Button type="submit" className="mt-3">Register</Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className='link-container'>
          <a href="/" className='link'>Don you have an account? Login here</a>
        </div>
      </Card>
    </div>
  );
};

export default Register;