import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/navbar/navbar';
import Main from '@/components/main/main';

import { Toaster } from '@/components/ui/toaster';

import { ThemeProvider } from '@/components/theme-provider';

function App() {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <BrowserRouter>
                <main className='flex flex-col w-full h-screen'>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Main />} />
                        <Route path='/saved' element={<h1>Saved Passwords</h1>} />
                        <Route path='/saved/:id' element={<h1>Saved Password one</h1>} />
                    </Routes>
                    <Toaster />
                </main>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
