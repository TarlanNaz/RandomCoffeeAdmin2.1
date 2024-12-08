import { Button, Table, Space } from 'antd';
import { supabase } from '../../../shared/supabaseClient';
import { useEffect, useState } from 'react';

interface Place {
  id: number;
  title: string;
  location: string;
  created_at: string;
  updated_at: string;
}

function PlacesList() {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('places').select();
        if (error) throw error;
        if (data) {
          setPlaces(data);
        }
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };
    fetchData();
  }, []);

  async function addPlace() {
    try {
      const { error } = await supabase
        .from('places')
        .insert({title: 'Кто-нибудь', location: 'Point(1 4)'});
      
      if (error) throw error;

      const { data, error: fetchError } = await supabase.from('places').select();
      if (fetchError) throw fetchError;
      
      if (data) {
        setPlaces(data);
      }
    } catch (error) {
      console.error('Error adding place:', error);
    }
  }

  interface ColumnType {
    title: string;
    dataIndex?: string;
    key?: string;
    render?: (text: any, record: Place) => JSX.Element;
  }

  const columns: ColumnType[] = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => (
        <span style={{ color: '#6D4C41' }}>{text}</span>
      )
    },
    {
      title: 'Местоположение',
      dataIndex: 'location',
      key: 'location',
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
  ];

  return (
    <>
      <Button onClick={() => addPlace()} style={{ background: '#A47B67', color: '#FFF' }}>Добавить место</Button>
      <Table dataSource={places} columns={columns} rowKey="id" />
    </>
  );
}

export default PlacesList;
