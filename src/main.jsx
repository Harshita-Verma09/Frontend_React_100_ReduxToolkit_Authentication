import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   
      <App />
    
  </Provider>
);
