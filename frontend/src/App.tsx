import Navbar from '@/components/navbar/navbar';
import Main from '@/components/main/main';

import { Toaster } from '@/components/ui/toaster';

import { ThemeProvider } from '@/components/theme-provider';

function App() {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <main className='flex flex-col w-full h-screen'>
                <Navbar />
                <Main />
                <Toaster />
            </main>
        </ThemeProvider>
    );
}

export default App;
