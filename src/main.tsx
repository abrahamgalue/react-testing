import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SessionProvider } from './context/AuthContext';
import './styles.scss';

const root = createRoot(document.getElementById('root')!);
root.render(
  <SessionProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SessionProvider>
);
