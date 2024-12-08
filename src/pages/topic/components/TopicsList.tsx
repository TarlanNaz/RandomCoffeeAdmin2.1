import { Button, Table } from 'antd';
import { supabase } from '../../../shared/supabaseClient.tsx';
import { useEffect, useState } from 'react';

interface Topic {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

function TopicsList() {
  const [data, setData] = useState<Topic[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('topics').select();
        if (error) throw error;
        if (data) {
          setData(data);
        }
      } catch (error) {
        console.error('Error fetching topics:', error);
      } 
    };
    fetchData();
  }, []);

  async function addTopic() {
    try {
      const { error } = await supabase
        .from("topics")
        .insert({ title: "Что-нет" });
      
      if (error) throw error;

      const { data, error: fetchError } = await supabase.from('topics').select();
      if (fetchError) throw fetchError;
      
      if (data) {
        setData(data);
      }
    } catch (error) {
      console.error('Error adding topic:', error);
    }
  }

  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
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
  ];

  return (
    <>
      <Button onClick={() => addTopic()} style={{ background: '#A47B67', color: '#FFF' }}>Добавить тему</Button>
      <Table dataSource={data} columns={columns} rowKey="id" />
    </>
  );
}

export default TopicsList;
