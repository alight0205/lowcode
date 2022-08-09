
import './App.less'
import { routes } from "./router";
import { useRoutes } from "react-router-dom";
import BaseLayout from './layouts/BaseLayout';
function App() {

  const element = useRoutes(routes);
  return element ;
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const userInfo= useMemo(()=>{
  //   return {
  //     username,
  //     password
  //   }
  // },[username,password])
  // return (
  // <div className="App">
  //   {/* <input type="text" value={username} onChange={e=>setUsername(e.target.value)} />
  //   <input type="text" value={password} onChange={e=>setPassword(e.target.value)} />
  //   {JSON.stringify({username,password,userInfo})} */}
  //   <Home />
  // </div>

  // )
}

export default App
