import React from 'react';
import { Button, Form, Input } from 'antd';

const Login = () => {
  const onFinish = async (values) => {
    try {
      const response = await fetch('http://localhost:3088/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        // Handle error responses, e.g., invalid credentials
        console.error('Login failed:', response.statusText);
        return;
      }

      const data = await response.json();
      const token = data.token; // Assuming the token is returned in the response
      
      // Store the token in local storage or a state management solution
      localStorage.setItem('token', token);
      window.location.href = './Dashboard';
      
      console.log('Login successful. Token:', token);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
        border: '1px solid #ccc',
        borderRadius: '10px', // Adjust border radius to make it square
        padding: '20px', // Adjust padding as needed
        boxSizing: 'border-box', // Include padding in width and height
      }}>
        <Form
          name="basic"
          labelCol={{
            span: 6, // Adjusted span to reduce space between label and input
          }}
          wrapperCol={{
            span: 18, // Adjusted span to reduce space between label and input
          }}
          style={{
            maxWidth: 400,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            labelAlign="left"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
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
            labelAlign="left"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
