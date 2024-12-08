
import { Routes, Route, HashRouter } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import AdminPage from './pages/admin/AdminPage';
import TopicsPage from './pages/topic/TopicsPage';
import PlacesPage from './pages/place/PlacesPage';
import TestPage  from './pages/test/TestPage';
import SignUpPage from './pages/signup/SignUpPage';
import MapPage from './pages/map/MapPage';

function App() {
  return (
    <HashRouter>
      {/* определяем маршруты и сопоставляем их с компонентами (страницами) */}
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="topics" element={<TopicsPage />} />
        <Route path="places" element={<PlacesPage />} />
        <Route path="test" element={<TestPage />} />
        {/* маршрут по умолчанию */}
        <Route path="*" element={<AdminPage />} />
        <Route path="map" element={<MapPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
