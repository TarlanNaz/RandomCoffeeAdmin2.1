import { useState } from 'react';
import { Input } from 'antd';


function TestList() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  return (
    <div>
      <p>Статистика</p>    
      <Input value={inputValue} onChange={handleChange} />
      <button onClick={()=>{console.log(inputValue);
      }}>sadsad</button>
    </div>
  )
}
export default TestList;
