import { Button, Table, Space } from 'antd';
import { supabase } from '../../../shared/supabaseClient.tsx';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}

function UsersList() {
  const [data, setData] = useState<User[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('users').select();
        if (error) throw error;
        if (data) {
          setData(data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } 
    };
    fetchData();
  }, []);

  async function addUser() {
    try {
      const { error: insertError } = await supabase
        .from('users')
        .insert({ first_name: 'Что-нибудь', last_name: 'Кто-нибудь' });

      if (insertError) throw insertError;

      const { data, error: selectError } = await supabase.from('users').select();
      if (selectError) throw selectError;
      
      if (data) {
        setData(data);
      }
    } catch (error: any) {
      console.error('Error adding user:', error);
    }
  }


  interface ColumnType {
    title: string;
    dataIndex?: string;
    key?: string;
    render?: (text: any, record: User) => JSX.Element;
  }

  const columns: ColumnType[] = [
    {
      title: 'Имя',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (text: string) => (
        <span style={{ color: '#6D4C41' }}>{text}</span>
      )
    },
    {
      title: 'Фамилия',
      dataIndex: 'last_name',
      key: 'last_name',
      render: (text: string) => (
        <span style={{ color: '#6D4C41' }}>{text}</span>
      )
    },
    {
      title: 'Время создания',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => (
        <span style={{ color: '#8B6B5A' }}>{text}</span>
      )
    },
    {
      title: 'Время последнего изменения',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text: string) => (
        <span style={{ color: '#8B6B5A' }}>{text}</span>
      )
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            onClick={() => console.log(record.id)}
            style={{
              background: '#A47B67',
              color: '#FFF',
              border: 'none',
              boxShadow: '0 2px 4px rgba(164, 123, 103, 0.2)'
            }}
          >
            Редактировать
          </Button>
          <Button
            style={{
              background: '#6D4C41',
              color: '#FFF',
              border: 'none',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            Удалить
          </Button>
        </Space>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            onClick={() => console.log(record.id)}
            style={{
              background: '#A47B67',
              color: '#FFF',
              border: 'none',
              boxShadow: '0 2px 4px rgba(164, 123, 103, 0.2)'
            }}
          >
            Редактировать
          </Button>
          <Button
            style={{
              background: '#6D4C41',
              color: '#FFF',
              border: 'none',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button onClick={() => addUser()} style={{ background: '#A47B67', color: '#FFF' }}>Добавить пользователя</Button>
      <Table dataSource={data} columns={columns} rowKey="id" />
    </>
  );
}

export default UsersList;
