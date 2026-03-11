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
import AdminNews from './pages/AdminNews'; // <-- ADDED ADMIN NEWS IMPORT
import AdminLayout, { AdminRoute } from './pages/AdminLayout';

// Inline Layout for the public website
const PublicLayout = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-16">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

// Inline Layout for the Admin Panel (This restores the dark sidebar!)
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

        {/* Protected Admin Routes (Now wrapped in the Sidebar Layout) */}
        <Route element={<ProtectedAdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/faculty" element={<AdminFaculty />} />
          <Route path="/admin/student" element={<AdminStudentPage />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/news" element={<AdminNews />} /> {/* <-- ADDED NEWS ROUTE */}
        </Route>

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;