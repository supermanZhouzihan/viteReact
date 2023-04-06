import { useState } from 'react'
import Test from './components/Test';
import Test1 from './components/Test1';
// import { Button } from 'antd';
import {Outlet,Link,useRoutes} from "react-router-dom"
import router from "./routes"
function App() {
  const [count, setCount] = useState(0)
  const baseRouter= useRoutes(router)//hook形式
  return (
    <div className="App">
      {/* <Test></Test>
      <Test1 />
      <Button type="primary">aaa</Button>
      测试了哈sss  */}
      {/* <Link to={'/home'}>HOME</Link>
      <Link to={'/about'}>about</Link> */}
      {/* <Outlet></Outlet>
       */}
       {baseRouter}
    </div>
  )
}

export default App
