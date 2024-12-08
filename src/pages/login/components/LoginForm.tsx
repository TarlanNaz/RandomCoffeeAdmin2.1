import React from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../shared/supabaseClient';
import './LoginForm.css';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;
      if (data) navigate('/users');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const inputStyle = {
    borderColor: '#C4A494',
    borderRadius: '12px',
    padding: '10px 16px',
    width: '100%',
    fontSize: '15px',
    transition: 'all 0.2s ease-in-out',
  };

  const labelStyle = {
    color: '#6D4C41',
    fontSize: '14px',
    fontWeight: '500'
  };

  const primaryButtonStyle = {
    width: '100%',
    height: '44px',
    background: '#A47B67',
    borderColor: '#A47B67',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '500',
    boxShadow: '0 2px 4px rgba(164, 123, 103, 0.2)',
    marginTop: '8px',
    transition: 'all 0.2s ease-in-out',
  };

  const secondaryButtonStyle = {
    width: '100%',
    height: '44px',
    background: 'transparent',
    borderColor: '#C4A494',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '500',
    color: '#6D4C41',
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <Form
      name="login"
      onFinish={onFinish}
      layout="vertical"
      style={{ width: '100%' }}
    >
      <h2 style={{ 
        textAlign: 'center', 
        color: '#6D4C41', 
        marginBottom: '32px',
        marginTop: '8px',
        fontSize: '24px',
        fontWeight: '500',
        letterSpacing: '-0.3px'
      }}>
        Вход в систему
      </h2>

      <Form.Item
        label={<span style={labelStyle}>Email</span>}
        name="email"
        rules={[{ required: true, message: 'Пожалуйста, введите email!' }]}
      >
        <Input 
          className="custom-input"
          style={inputStyle}
          placeholder="Введите email" 
        />
      </Form.Item>

      <Form.Item
        label={<span style={labelStyle}>Пароль</span>}
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
      >
        <Input.Password 
          className="custom-input"
          style={inputStyle}
          placeholder="Введите пароль"
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: '16px' }}>
        <Button
          type="primary"
          htmlType="submit"
          className="primary-button"
          style={primaryButtonStyle}
        >
          Войти
        </Button>
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button 
          onClick={() => navigate('/signup')}
          className="secondary-button"
          style={secondaryButtonStyle}
        >
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;