import { useEffect } from 'react';
import { Layout, Menu, theme, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../shared/supabaseClient';
import MapList from './components/MapList';

const { Header, Content, Sider } = Layout;

function MapPage() {
  const navigate = useNavigate();
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) navigate('/login');
    };

    fetchUser();
  }, [navigate]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <Layout style={{ height: '100vh', background: '#F5F0ED' }}>
      <Sider style={{ background: '#A47B67' }}>
        <div style={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 24px',
          color: '#FFF',
          fontSize: '20px',
          fontWeight: '600',
          letterSpacing: '-0.3px',
          background: 'linear-gradient(135deg, #A47B67 0%, #8B6B5A 100%)',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          Coffee Admin
        </div>
        <Menu
          onClick={(e) => navigate(e.key)}
          mode="inline"
          defaultSelectedKeys={['/map']}
          style={{ 
            background: '#A47B67', 
            color: '#F5F0ED',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '15px',
            fontWeight: '500'
          }}
          items={[
            {
              key: '/users',
              label: 'Пользователи',
            },
            {
              key: '/topics',
              label: 'Темы',
            },
            {
              key: '/places',
              label: 'Места',
            },
            {
              key: '/map',
              label: 'Карта',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: '0 24px', 
          background: '#FFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
        }}>
          <Space style={{ flex: 1 }} />
          <Space style={{ flex: 1 }} />
          <Button 
            onClick={logout}
            style={{
              background: '#A47B67',
              borderColor: '#A47B67',
              color: '#FFF',
              height: '36px',
              padding: '0 20px',
              fontSize: '14px',
              fontWeight: '500',
              fontFamily: 'Montserrat, sans-serif',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(164, 123, 103, 0.2)',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Выйти
          </Button>
        </Header>
        <Content style={{ margin: '24px', padding: '24px', background: '#FFF', borderRadius: borderRadiusLG }}>
          <MapList />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MapPage;
