import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import logo from '../assets/anafiya_logo.webp';
import useMenuHandler from '../hooks/useMenuHandler';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const innerRef = useMenuHandler(() => setIsOpen(false));

  return (
    <nav className='sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <div className='relative flex items-center justify-between h-16'>
          <div className='flex items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex-shrink-0 flex items-center'>
              <Link to='/'>
                <img className='w-28' src={logo} alt='' />
              </Link>
            </div>
            {/* <div className='hidden sm:block sm:ml-6'>
                <div className='flex space-x-4'>
                 
                  <a
                    href='/'
                    className='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Dashboard
                  </a>
                  <a
                    href='/'
                    className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Team
                  </a>
                  <a
                    href='/'
                    className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Projects
                  </a>
                  <a
                    href='/'
                    className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Calendar
                  </a>
                </div>
              </div> */}
          </div>
          <div className='absolute space-x-5 inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6'>
            {/* <Link href='/cart'>
              <a>
                <IconButton title='Cart' sr='View Carts'>
                  <svg
                    className='h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                    />
                  </svg>
                </IconButton>
              </a>
            </Link> */}
            <form>
              <div className='relative'>
                <input
                  className='border-none focus:ring-gray-200 transition-shadow duration-500 rounded-md bg-gray-100 px-5 overflow-hidden'
                  type='text'
                  placeholder='Search here...'
                />
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className='w-5 absolute top-2/4 right-5 transform -translate-y-2/4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
            </form>

            {true ? (
              <>
                <Link to='/login'>
                  <button className='outline-none px-5 py-2'>Sign in</button>
                </Link>
                <Link to='/register'>
                  <button className='bg-purple-600 text-white px-5 py-2 rounded-md'>
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <div className='relative'>
                <div>
                  <button
                    className='flex text-sm rounded-full focus:outline-none items-center'
                    id='user-menu'
                    aria-haspopup='true'
                    onClick={() => setIsOpen(prev => !prev)}
                  >
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='h-8 w-8 rounded-full'
                      src='https://res.cloudinary.com/muttakinhasib/image/upload/v1611336104/avatar/user_qcrqny.svg'
                      alt=''
                    />
                    <span className='ml-3 text-gray-800 font-semibold'>
                      User Name
                    </span>
                  </button>
                </div>

                <Transition
                  show={isOpen}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <div
                    ref={innerRef}
                    className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu'
                  >
                    <Link to='/profile'>
                      <span
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        role='menuitem'
                        onClick={() => setIsOpen(false)}
                      >
                        Your Profile
                      </span>
                    </Link>
                    <a
                      href='/'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      role='menuitem'
                    >
                      Settings
                    </a>
                    <button
                      className='flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      role='menuitem'
                    >
                      Sign out
                    </button>
                  </div>
                </Transition>
              </div>
            )}
          </div>
        </div>
      </div>

      {/*
        Mobile menu, toggle classes based on menu state.
    
        Menu open: "block", Menu closed: "hidden"
      */}
      {/* <div className='hidden sm:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            
            <a
              href='/'
              className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              Dashboard
            </a>
            <a
              href='/'
              className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              Team
            </a>
            <a
              href='/'
              className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              Projects
            </a>
            <a
              href='/'
              className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              Calendar
            </a>
          </div>
        </div> */}
    </nav>
  );
};

export default Header;
