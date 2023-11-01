import React from 'react';
import { Link } from 'react-router-dom';
import { Auth, User, signOut } from 'firebase/auth';

interface HeaderProps {
  auth: Auth;
  loggedIn: boolean;
  user: User | null;
}
 
const Header: React.FC<HeaderProps> = ({ auth, loggedIn, user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log('Failed to log out:', error);
    }
  };

  return (
    <header className="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">
      <div className="flex items-center justify-between mb-4 md:mb-0">
        <h1 className="leading-none text-2xl text-grey-darkest">
          <Link className="no-underline text-grey-darkest hover:text-black" to="/">
            My Dropbox
          </Link>
        </h1>

        <a className="text-black hover:text-orange md:hidden" href="#">
          <i className="fa fa-2x fa-bars"></i>
        </a>
      </div>

      <nav>
        <ul className="list-reset md:flex md:items-center">
          {user ? (
            <>
            <li className="md:ml-4">
              <Link
                className="block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
                to="/upload"
              >
                Upload
              </Link>
            </li>
            <li className="md:ml-4">
              <a
                className="block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
                href=""
                onClick={handleLogout}
                >
                Log Out
              </a>
            </li>
                </>
          ) : (
            <>
              <li className="md:ml-4">
                <Link
                  to="/login"
                  className="block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
                >
                  Login
                </Link>
              </li>
              <li className="md:ml-4">
                <Link
                  to="/register"
                  className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
