import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.jsx'
import { SheetProvider } from '../src/components/SheetContext/SheetContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <SheetProvider>
    <Provider store={store}>   
        <App />
    </Provider>
    </SheetProvider>

)
