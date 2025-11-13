
import React, { useState, useEffect, useCallback } from 'react';
import { AppContextProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import CarDetailsPage from './pages/CarDetailsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

type Route = {
  path: string;
  component: React.ComponentType<any>;
};

const routes: Route[] = [
  { path: '#/', component: HomePage },
  { path: '#/cars', component: CarsPage },
  { path: '#/car/', component: CarDetailsPage }, // Note: parameter handled internally
  { path: '#/about', component: AboutPage },
  { path: '#/contact', component: ContactPage },
];

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  const handleHashChange = useCallback(() => {
    setCurrentPath(window.location.hash || '#/');
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleHashChange]);

  const CurrentPage = () => {
    const matchedRoute = routes.find(route => {
      if (route.path.endsWith('/')) {
        return currentPath.startsWith(route.path);
      }
      return route.path === currentPath;
    });
    
    const PageComponent = matchedRoute ? matchedRoute.component : HomePage;
    
    if (currentPath.startsWith('#/car/')) {
        const carId = currentPath.split('/')[2];
        return <CarDetailsPage carId={carId} />;
    }

    return <PageComponent />;
  };

  return (
    <AppContextProvider>
      <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen flex flex-col font-sans transition-colors duration-300">
        <Header />
        <main className="flex-grow">
          <CurrentPage />
        </main>
        <Footer />
      </div>
    </AppContextProvider>
  );
};

export default App;
