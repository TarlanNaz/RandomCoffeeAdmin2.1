import { Button, Form, Input, message } from 'antd';
import { supabase } from '../../../shared/supabaseClient';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

type FieldType = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpList: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: FieldType) => {
    if (values.password !== values.confirmPassword) {
      message.error('Пароли не совпадают');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      if (data) {
        message.success('Регистрация успешна! Проверьте вашу почту для подтверждения.');
        navigate('/login');
      }
    } catch (error: any) {
      message.error(error.message || 'Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #8B6B5A 0%, #A47B67 100%)'
    }}>
      <Form<FieldType>
        form={form}
        name="signup"
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '32px',
          backgroundColor: '#FFF',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
        onFinish={onFinish}
        layout="vertical"
        size="large"
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '24px',
            margin: 0,
            color: '#6D4C41',
            fontWeight: 600
          }}>
            Регистрация
          </h1>
        </div>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Пожалуйста, введите email' },
            { type: 'email', message: 'Пожалуйста, введите корректный email' }
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: '#A47B67' }} />}
            placeholder="Email"
            size="large"
            style={{ borderColor: '#C4A494' }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Пожалуйста, введите пароль' },
            { min: 6, message: 'Пароль должен быть не менее 6 символов' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: '#A47B67' }} />}
            placeholder="Пароль"
            size="large"
            style={{ borderColor: '#C4A494' }}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: 'Пожалуйста, подтвердите пароль' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: '#A47B67' }} />}
            placeholder="Подтвердите пароль"
            size="large"
            style={{ borderColor: '#C4A494' }}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: '12px' }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            style={{
              height: '46px',
              background: '#A47B67',
              borderColor: '#A47B67',
              fontWeight: 500,
              fontSize: '16px'
            }}
          >
            Зарегистрироваться
          </Button>
        </Form.Item>

        <Button
          block
          size="large"
          onClick={() => navigate('/login')}
          style={{
            height: '46px',
            background: '#F5F0ED',
            borderColor: '#C4A494',
            color: '#6D4C41',
            fontWeight: 500,
            fontSize: '16px'
          }}
        >
          Уже есть аккаунт? Войти
        </Button>
      </Form>
    </div>
  );
};

export default SignUpList;