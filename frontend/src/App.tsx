import Navbar from '@/components/navbar/navbar';
import Main from '@/components/main/main';

import { Toaster } from '@/components/ui/toaster';

function App() {
    return (
        <main className='flex flex-col w-full h-screen bg-green-200'>
            <Navbar />
            <Main />
            <Toaster />
        </main>
    );
}

export default App;
