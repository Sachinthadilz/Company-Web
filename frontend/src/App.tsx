import { useEffect, useState, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Careers from './pages/Careers';
import JobDetails from './pages/JobDetails';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

const PageWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
);

const PublicRoutes = () => (
  <AnimatePresence mode="wait">
    <Routes>
      <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
      <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
      <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
      <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
      <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />
      <Route path="/careers/:id" element={<PageWrapper><JobDetails /></PageWrapper>} />
      <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
      <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
      <Route path="/blog/:slug" element={<PageWrapper><BlogPost /></PageWrapper>} />
    </Routes>
  </AnimatePresence>
);

const AdminRoutes = () => (
  <Routes>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminDashboard />} />
  </Routes>
);

const AppContent = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <AdminRoutes />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FB] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-1">
        <PublicRoutes />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('artecx-dark-mode');
    if (stored !== null) {
      return stored === 'true';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('artecx-dark-mode', String(darkMode));
  }, [darkMode]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />
    </BrowserRouter>
  );
}

export default App;
