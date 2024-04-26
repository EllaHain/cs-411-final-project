import React from "react";
import { Form, Input, Checkbox, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Signup = () => {
  const onFinish = async (values) => {
    try {
      // Send form data to backend
      await submitFormData(values);
      console.log('Form data submitted successfully');
      // Handle success
    } catch (error) {
      console.error("Error submitting form data:", error);
      // Handle error
    }
  };

  // Function to send form data to backend
  const submitFormData = async (formData) => {
    try {
      // Send POST request to backend API endpoint
      const response = await fetch('http://localhost:3088/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response)
      if (response.ok) {
        //const responseData = await response.json();
        //console.log('Response from backend:', responseData);
        message.success("Signup successful");
        //window.location.href = "./Login";
      } else {
        if (response.status === 409) {
          message.error("User already exists. Please log in.");
          // Display a message to the user indicating that the user already exists
        } else {
          console.error("Signup didn't succeed.");
          // Display a generic error message for other types of errors
        }
      }
      
    } catch (error) {
      throw error;
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh', // Ensure the div takes the full height of the viewport
    }}>
    <div style={{
      width: '400px', // Adjust width as needed
      height: '400px', // Adjust height as needed
      border: '1px solid #ccc',
      borderRadius: '10px', // Adjust border radius to make it square
      padding: '20px', // Adjust padding as needed
      boxSizing: 'border-box', // Include padding in width and height
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'}}
      >
    <Form
      name="signup_form"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input placeholder="Email"/>
      </Form.Item>
      <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
      <Form.Item wrapperCol={{
        offset: 7,
        span: 16,
      }}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign Up
        </Button >
        <span style={{ display: "contents", alignItems: "center" }}> or <a href="./Login"> Log in! </a></span>
      </Form.Item>
    </Form>
    </div>
    </div>
  );
}

export default Signup;
