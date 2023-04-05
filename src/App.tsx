import { useState } from 'react'
import Test from './components/Test';
import Test1 from './components/Test1';
import { Button } from 'antd';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Test></Test>
      <Test1 />
      <Button type="primary">aaa</Button>
      测试了哈
    </div>
  )
}

export default App
