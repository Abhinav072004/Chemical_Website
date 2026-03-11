import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Public Components
import Header from './components/Header';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import Faculty from './pages/Faculty';
import Academics from './pages/Academics';
import Contact from './pages/Contact';
import Research from './pages/Research';
import About from './pages/About';
import EventsPage from './pages/Events';
import ResearchDetail from './pages/ResearchDetail';
import StudentsPage from './pages/Students';

// Admin imports
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminFaculty from './pages/AdminFaculty';
import AdminStudentPage from './pages/AdminStudent'; 
import AdminEvents from './pages/AdminEvents';
import AdminNews from './pages/AdminNews';
import AdminLayout, { AdminRoute } from './pages/AdminLayout';

// Inline Layout for the public website
// --- THE MOBILE OVERFLOW FIX IS RIGHT HERE ---
const PublicLayout = () => {
  return (
    <div className="w-full overflow-x-hidden flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

// Inline Layout for the Admin Panel
const ProtectedAdminLayout = () => {
  return (
    <AdminRoute>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </AdminRoute>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/faculty/:category" element={<Faculty />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/research" element={<Research />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/research/:slug" element={<ResearchDetail />} />
          <Route path="/students/:role" element={<StudentsPage />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedAdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/faculty" element={<AdminFaculty />} />
          <Route path="/admin/student" element={<AdminStudentPage />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/news" element={<AdminNews />} />
        </Route>

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;