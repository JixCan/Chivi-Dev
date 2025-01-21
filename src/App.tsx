import './App.css';
import Menu from './components/menu';
import Picker from './components/word-picker';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Импортируем компоненты маршрутизации
// import './fonts/fonts.css'; 

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu /> {/* Меню будет отображаться на всех страницах */}
        <Routes>
          {/* Маршрут для главной страницы */}
          <Route path="/" element={<Picker />} />

          {/* Пример другого маршрута */}
          <Route path="/about" element={<div>About Page</div>} />

          {/* Маршрут для несуществующих страниц (опционально) */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;