import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import HomePage from './routes/HomePage/HomePage';
// import CreatePage from './routes/CreatePage/CreatePage';
// import PostPage from './routes/PostPage/PostPage';
// import AuthPage from './routes/AuthPage/AuthPage';
// import ProfilePage from './routes/ProfilePage/ProfilePage';
// import SearchPage from './routes/SearchPage/SearchPage';
import { BrowserRouter, Route, Routes } from 'react-router';
import MainLayout from './routes/Layouts/mainLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const HomePage = React.lazy(() => import('./routes/HomePage/HomePage'));
const CreatePage = React.lazy(() => import('./routes/CreatePage/CreatePage'));
const PostPage = React.lazy(() => import('./routes/PostPage/PostPage'));
const AuthPage = React.lazy(() => import('./routes/AuthPage/AuthPage'));
const ProfilePage = React.lazy(() => import('./routes/ProfilePage/ProfilePage'));
const SearchPage = React.lazy(() => import('./routes/SearchPage/SearchPage'));

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/pin/:id" element={<PostPage />} />
            <Route path="/:username" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
