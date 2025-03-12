'use client';

import { useAuth } from '@clerk/nextjs';
import useCartService from '@/lib/hooks/useCartStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { SignOutButton, UserButton } from '@clerk/nextjs';

const Menu = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useAuth();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div>
      {isMobile ? (
        <div className="relative">
          {/* Hamburger Icon */}
          <button
            onClick={toggleMenu}
            className="text-3xl text-white p-2 rounded-lg hover:bg-gray-700 transition"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <ul className="absolute top-full left-0 bg-gray-800 w-full flex flex-col items-start gap-4 px-4 py-6 shadow-lg">
              <li className="flex items-center">
                <Link
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-lg font-medium hover:bg-green-500 hover:text-white transition"
                  href="/cart"
                >
                  <FaShoppingCart className="text-xl" />
                  Cart
                  {mounted && items.length > 0 && (
                    <div className="badge badge-secondary">
                      {items.reduce((a, c) => a + c.qty, 0)}
                    </div>
                  )}
                </Link>
              </li>
              {!isSignedIn ? (
                <li className="flex items-center">
                  <Link
                    href="/sign-in"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-lg font-medium hover:bg-green-500 hover:text-white transition"
                  >
                    <FaSignInAlt className="text-xl" />
                    Sign In
                  </Link>
                </li>
              ) : (
                <>
                  <li className="flex items-center">
                    <SignOutButton>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-lg font-medium text-white bg-red-500 hover:bg-red-600 transition">
                        <FaSignOutAlt className="text-xl" />
                        Sign Out
                      </button>
                    </SignOutButton>
                  </li>
                  <li className="flex items-center">
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonOuter:
                            'bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition',
                          userButtonAvatarBox: 'w-8 h-8 rounded-full',
                          userButtonPopoverCard: 'bg-white shadow-lg border rounded-lg',
                          userButtonPopoverPrimaryButton:
                            'bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg',
                          userButtonPopoverActionButton:
                            'text-red-500 hover:text-red-600 font-medium transition',
                        },
                      }}
                    />
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      ) : (
        <ul className="flex items-center justify-around sm:justify-between gap-7 flex-wrap px-2">
          <li className="flex items-center">
            <Link
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-lg font-medium hover:bg-green-500 hover:text-white transition"
              href="/cart"
            >
              <FaShoppingCart className="text-xl" />
              Cart
              {mounted && items.length > 0 && (
                <div className="badge badge-secondary">
                  {items.reduce((a, c) => a + c.qty, 0)}
                </div>
              )}
            </Link>
          </li>
          {!isSignedIn ? (
            <li className="flex items-center">
              <Link
                href="/sign-in"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-lg font-medium hover:bg-green-500 hover:text-white transition"
              >
                <FaSignInAlt className="text-xl" />
                Sign In
              </Link>
            </li>
          ) : (
            <>
              <li className="flex items-center">
                <SignOutButton>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-lg font-medium text-white bg-red-500 hover:bg-red-600 transition">
                    <FaSignOutAlt className="text-xl" />
                    Sign Out
                  </button>
                </SignOutButton>
              </li>
              <li className="flex items-center">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonOuter:
                        'bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition',
                      userButtonAvatarBox: 'w-8 h-8 rounded-full',
                      userButtonPopoverCard: 'bg-white shadow-lg border rounded-lg',
                      userButtonPopoverPrimaryButton:
                        'bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg',
                      userButtonPopoverActionButton:
                        'text-red-500 hover:text-red-600 font-medium transition',
                    },
                  }}
                />
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Menu;
