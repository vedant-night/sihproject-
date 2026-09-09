import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-900 text-slate-100 overflow-hidden">
      <Navbar />
      <Dashboard />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #334155' },
        }}
      />
    </div>
  );
}

export default App;
