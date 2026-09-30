import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context';
import { AppLayout } from './components/Layout/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { ChatPage } from './pages/ChatPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { DocsPage } from './pages/DocsPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { ContactsPage } from './pages/ContactsPage';
import { OrgPage } from './pages/OrgPage';
import { MentorPage } from './pages/MentorPage';

// Simple Route Guard (redirects to /login if logged out)
const ProtectedRoutes: React.FC = () => {
  const { isLoggedIn } = useApp();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <AppLayout />;
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected App Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/org" element={<OrgPage />} />
            <Route path="/mentor" element={<MentorPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
