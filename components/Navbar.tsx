import getCurrentUser from '@/app/hooks/getCurrentUser';
import Link from 'next/link';
import { BsSubtract } from 'react-icons/bs';
import Menu from './Menu';
import Profile from './Profile';

const Navbar = async () => {
    const currentUser = await getCurrentUser();

    return (
        <nav className='container flex items-center justify-between px-5 space-x-6 h-14 border-b'>
            <div className='flex items-center space-x-6'>
                <Link href="/" className=' text-slate-800'><BsSubtract className="text-3xl" /></Link>
                {currentUser && (
                    <Menu />
                )}
            </div>

            <Profile />
        </nav>
    )
}

export default Navbar