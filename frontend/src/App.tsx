import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '@/components/navbar/navbar';
import Main from '@/components/main/main';

import { Toaster } from '@/components/ui/toaster';

import { ThemeProvider } from '@/components/theme-provider';
import SavedPasswords from './components/main/_components/saved-passwords';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const auth = useSelector((state: any) => state.user);

    return auth ? children : <Navigate to={'/'} replace />;
};

function App() {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <BrowserRouter>
                <main className='flex flex-col w-full h-screen'>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Main />} />
                        <Route
                            path='/saved'
                            element={
                                <ProtectedRoute>
                                    <SavedPasswords />
                                </ProtectedRoute>
                            }
                        />
                        <Route path='/saved/:id' element={<h1>Saved Password one</h1>} />
                    </Routes>
                    <Toaster />
                </main>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
