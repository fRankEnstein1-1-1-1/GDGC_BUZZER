import {HashRouter , Routes,Route} from 'react-router-dom'
import Player from './Pages/Player'
import Admin from './Pages/Admin'
import Landing from './Pages/Landing'
function App()
{

  return (
<HashRouter>
<Routes>
  <Route path='/' element = {<Landing/>} />
  <Route path='/admin' element = {<Admin/>} />
  <Route path='/player' element = {<Player/>} />
</Routes>
</HashRouter>
)
}
export default App