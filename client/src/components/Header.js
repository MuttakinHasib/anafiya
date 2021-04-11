import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import logo from '../assets/anafiya_logo.webp';
import useMenuHandler from '../hooks/useMenuHandler';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const innerRef = useMenuHandler(() => setIsOpen(false));
  const { user } = useSelector(({ userLogin }) => userLogin);
  const { cartItems } = useSelector(({ cart }) => cart);
  return (
    <nav className='sticky top-0 z-50 border-b bg-white'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <div className='relative flex items-center justify-between h-16'>
          <div className='absolute inset-y-0 right-0 flex items-center md:hidden space-x-3'>
            <form className='hidden sm:block'>
              <div className='relative'>
                <input
                  className='text-sm border-none focus:ring-gray-200 transition-shadow duration-500 rounded-md bg-gray-100 px-4 pl-10 py-2 overflow-hidden'
                  type='text'
                  placeholder='Search here...'
                />
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className='w-4 absolute top-2/4 left-3 transform -translate-y-2/4 text-gray-600'
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

            {/* Mobile menu button*/}
            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'
              onClick={() => setOpenMenu(!openMenu)}
            >
              <span className='sr-only'>Open main menu</span>
              {/*
                Icon when menu is closed.
    
                Heroicon name: outline/menu
    
                Menu open: "hidden", Menu closed: "block"
              */}
              <svg
                className='block h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
              {/*
                Icon when menu is open.
    
                Heroicon name: outline/x
    
                Menu open: "block", Menu closed: "hidden"
              */}
              <svg
                className='hidden h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='flex items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex-shrink-0 flex items-center'>
              <Link to='/'>
                <img className='w-28' src={logo} alt='' />
              </Link>
            </div>
          </div>

          <div className='hidden md:block'>
            <div className='absolute space-x-5 inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6'>
              <form>
                <div className='relative'>
                  <input
                    className='border-none focus:ring-gray-200 transition-shadow duration-500 rounded-md bg-gray-100 px-5 pl-12 w-64 overflow-hidden'
                    type='text'
                    placeholder='Search here...'
                  />
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-5 absolute top-2/4 left-4 transform -translate-y-2/4 text-gray-600'
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
              <Link to='/cart' className='relative'>
                <button className='focus:outline-none hover:opacity-80 px-4 py-2 text-gray-700'>
                  <svg
                    className='w-8'
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
                </button>
                {cartItems.length > 0 && (
                  <div className='absolute top-0 -right-2 bg-red-500 px-2 h-5 flex justify-center items-center text-sm rounded-full text-white'>
                    {cartItems.length}
                  </div>
                )}
              </Link>
              {!user ? (
                <>
                  <Link to='/login'>
                    <button className='border rounded-md border-indigo-500 px-5 py-2'>
                      Sign in
                    </button>
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
                        src={user?.avatar}
                        alt=''
                      />
                      <span className='ml-3 text-gray-800 font-semibold'>
                        {user?.firstName} {user?.lastName}
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
                        onClick={() => {
                          dispatch(logout());
                          setIsOpen(false);
                        }}
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
      </div>

      {/*
        Mobile menu, toggle classes based on menu state.
    
        Menu open: "block", Menu closed: "hidden"
      */}
      <Transition
        show={openMenu}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <div className={'md:hidden ' + (openMenu ? 'block' : 'hidden')}>
          <div className='px-6 pt-2 pb-3 space-y-3'>
            <form className='block sm:hidden'>
              <div className='relative'>
                <input
                  className='text-sm border-none focus:ring-gray-200 transition-shadow duration-500 rounded-md bg-gray-100 px-4 pl-10 py-2 overflow-hidden'
                  type='text'
                  placeholder='Search here...'
                />
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className='w-4 absolute top-2/4 left-3 transform -translate-y-2/4 text-gray-600'
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
            {!user ? (
              <div className='space-x-3 text-sm'>
                <Link to='/cart'>
                  <button className='border rounded-md px-5 py-2'>Cart</button>
                </Link>
                <Link to='/register'>
                  <button className='bg-purple-600 text-white px-5 py-2 rounded-md'>
                    Login
                  </button>
                </Link>
              </div>
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
                      src={user?.avatar}
                      alt=''
                    />
                    <span className='ml-3 text-gray-800 font-semibold'>
                      {user?.firstName} {user?.lastName}
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
                      onClick={() => {
                        dispatch(logout());
                        setIsOpen(false);
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                </Transition>
              </div>
            )}
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Header;
