import {BrowserRouter , Routes,Route} from 'react-router-dom'
import Player from './Pages/Player'
import Admin from './Pages/Admin'
import Landing from './Pages/Landing'
function App()
{

  return (
<BrowserRouter>
<Routes>
  <Route path='/' element = {<Landing/>} />
  <Route path='/admin' element = {<Admin/>} />
  <Route path='/player' element = {<Player/>} />
</Routes>
</BrowserRouter>
)
}
export default App