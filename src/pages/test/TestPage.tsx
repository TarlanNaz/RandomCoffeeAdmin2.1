import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from '../../shared/supabaseClient.tsx';
//import TopicsList from './components/TopicsList';
import TestList from './components/TestList.tsx';
//import PlacesList from './components/UsersList.tsx';


const TestPage = () => {

  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session);
      if (!session) {
        navigate('/login');
      }
    };
    checkSession();
  }, []);

  async function logout() {
    supabase.auth.signOut();
    navigate('/login');
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider style={{ background: colorBgContainer }}>
        <Menu
          onClick={(e) => navigate(e.key)}
          mode="inline"
          defaultSelectedKeys={['users']}
          items={[
            {
              key: '/users',
              label: 'user',
            },
            {
              key: '/topics',
              label: 'topic',
            },
            {
              key: '/places',
              label: 'place',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', width: '100%', height: '100%', padding: '15px', columnGap: '15px' }}>
            <Button onClick={() => window.open('https://github.com/TarlanNaz?tab=repositories')}>Секрет</Button>
            <Button type="primary" color="danger" onClick={() => logout()}>Выйти</Button>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <TestList />
        </Content>
      </Layout>
    </Layout>
  );
}

export default TestPage;
