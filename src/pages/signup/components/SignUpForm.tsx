import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../shared/supabaseClient';

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;
      if (data) navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#6D4C41', 
        marginBottom: '32px',
        marginTop: '8px',
        fontSize: '24px',
        fontWeight: '500',
        letterSpacing: '-0.3px'
      }}>
        Регистрация
      </h2>
      <Form
        name="signup"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        style={{ width: '100%' }}
      >
        <Form.Item
          label={<span style={{ color: '#6D4C41' }}>Email</span>}
          name="email"
          rules={[
            { required: true, message: 'Пожалуйста, введите email!' },
            { type: 'email', message: 'Пожалуйста, введите корректный email!' }
          ]}
        >
          <Input 
            style={{ 
              borderColor: '#C4A494',
              borderRadius: '6px',
              padding: '8px 12px'
            }}
            placeholder="Введите email" 
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: '#6D4C41' }}>Пароль</span>}
          name="password"
          rules={[
            { required: true, message: 'Пожалуйста, введите пароль!' },
            { min: 6, message: 'Пароль должен быть не менее 6 символов!' }
          ]}
        >
          <Input.Password 
            style={{ 
              borderColor: '#C4A494',
              borderRadius: '6px',
              padding: '8px 12px'
            }}
            placeholder="Введите пароль"
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: '#6D4C41' }}>Подтверждение пароля</span>}
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Пожалуйста, подтвердите пароль!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают!'));
              },
            }),
          ]}
        >
          <Input.Password 
            style={{ 
              borderColor: '#C4A494',
              borderRadius: '6px',
              padding: '8px 12px'
            }}
            placeholder="Подтвердите пароль"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: '100%',
              height: '40px',
              background: '#A47B67',
              borderColor: '#A47B67',
              borderRadius: '6px',
              fontSize: '16px',
              boxShadow: '0 2px 4px rgba(164, 123, 103, 0.2)',
              marginTop: '12px'
            }}
          >
            Зарегистрироваться
          </Button>
        </Form.Item>

        <Button 
          onClick={() => navigate('/login')}
          style={{
            width: '100%',
            height: '40px',
            borderColor: '#C4A494',
            borderRadius: '6px',
            fontSize: '16px',
            color: '#6D4C41'
          }}
        >
          Уже есть аккаунт? Войти
        </Button>
      </Form>
    </div>
  );
};

export default SignUpForm;
