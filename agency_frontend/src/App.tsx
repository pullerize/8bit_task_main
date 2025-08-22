import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
import Calendar from './pages/Calendar'
import Reports from './pages/Reports'
import ExpensesReport from './pages/ExpensesReport'
import Users from './pages/Users'
import Operators from './pages/Operators'
import ProjectsAdmin from './pages/ProjectsAdmin'
import ProjectsOverview from './pages/ProjectsOverview'
import ProjectDetail from './pages/ProjectDetail'
import AdminPanel from './pages/AdminPanel'
import Digital from './pages/Digital'
import SmmProjects from './pages/SmmProjects'
import Analytics from './pages/Analytics'
import Resources from './pages/Resources'
import { SidebarProvider, useSidebar } from './contexts/SidebarContext'

function AppContent() {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const defaultPath = role === 'admin' ? '/smm-projects' : '/tasks'
  const { isCollapsed } = useSidebar()
  
  if (!token) {
    // Clear any stale data when no token
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    )
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar key="navbar-always-visible" />
      <main 
        className={`
          flex-1 px-4 sm:px-8 lg:px-[100px] py-8 max-w-full min-h-screen transition-all duration-300 ease-in-out
          ${isCollapsed ? 'ml-20' : 'ml-64'}
        `}
      >
        <div className="max-w-full w-full">
          <Routes>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/expenses-report" element={<ExpensesReport />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/users" element={<Users />} />
            <Route path="/operators" element={<Operators />} />
            <Route path="/projects" element={<ProjectsOverview />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/projects-admin" element={<ProjectsAdmin />} />
            <Route path="/digital/*" element={<Digital />} />
            <Route path="/smm-projects" element={<SmmProjects />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="*" element={<Navigate to={defaultPath} />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <SidebarProvider>
      <AppContent />
    </SidebarProvider>
  )
}

export default App
