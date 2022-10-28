import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import store from './redux/store'
import VolcanoContainer from './components/VolcanoContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <VolcanoContainer />
      </div>
    </Provider>
  )
}

export default App
