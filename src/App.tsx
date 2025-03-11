import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home';
import { SearchPage } from './pages/SearchPage';
import './index.css';
import Settings from './pages/Settings';
import Header from './components/Elements/Header';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Header />

          <main className="container mx-auto p-4 mt-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>

          <footer className="bg-gray-200 dark:bg-gray-800 p-4 mt-8">
            <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
              <p>© {new Date().getFullYear()} NewsHub</p>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
