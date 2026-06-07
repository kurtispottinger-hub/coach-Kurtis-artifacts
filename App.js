import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GIProfile from './GIProfile';
import GIBarrier from './GIBarrier';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gi-profile" element={<GIProfile />} />
        <Route path="/gi-barrier" element={<GIBarrier />} />
        <Route path="/" element={
          <div style={{ background: '#080808', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', color: '#333', fontFamily: 'system-ui' }}>
              <div style={{ color: '#e63329', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Coach Kurtis</div>
              <div style={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}>Game Intelligence Tools</div>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
