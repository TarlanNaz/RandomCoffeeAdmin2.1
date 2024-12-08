import React from 'react';
import SignUpForm from './components/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'radial-gradient(circle at center, #A47B67 0%, #8B6B5A 50%, #6D4C41 100%)',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        margin: '20px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #A47B67 0%, #8B6B5A 100%)',
          padding: '32px 24px',
          textAlign: 'center',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}>
          <h1 style={{
            margin: 0,
            color: '#fff',
            fontSize: '32px',
            fontWeight: '600',
            letterSpacing: '-0.5px'
          }}>
            Coffee Admin
          </h1>
        </div>
        <div style={{ padding: '32px 24px' }}>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;