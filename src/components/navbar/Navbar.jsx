import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ShoppingCartIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'


import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from "react-redux"

import { signOutUser } from '../../redux-features/user/userApi'
import profileIcon from "../../assets/icons/profileIcon.svg"





function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let cart = useSelector((state) => state.cart.items)

  function handleSignOut() {
    dispatch(signOutUser())
  }

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800 sticky top-0 p-1 z-50 w-full ">
        <div className="mx-auto sm:px-8 ">
          <div className="relative flex h-auto items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              {/* <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton> */}
            </div>
            {/* logo */}
            <div className="flex flex-1 items-center justify-start ">
              <a href="/" className="block px-4  text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden text-start">
                <img
                  alt="Your Company"
                  src="/fullLogo.png"
                  className="h-20 w-fit"
                />
              </a>

              {/* <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div> */}
            </div>
            {/* cart */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link to={"/cart"}>
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                >
                  {/* <span className="absolute -inset-1.5" /> */}
                  <span className="sr-only">View Cart</span>
                  <ShoppingCartIcon aria-hidden="true" className=" size-10 relative z-10 " />
                  {cart.length > 0 &&
                    <span className="inline-flex items-center rounded-md absolute -top-2.5 z-0  bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
                      {cart.length}
                    </span>}
                </button>
              </Link>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={profileIcon}
                    className="size-10 rounded-full"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >

                  <MenuItem as="div"   >
                    <Link to="/userprofile" className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden w-full text-start">
                      User Profile
                    </Link>
                  </MenuItem>
                  <MenuItem as="div"   >
                    <Link to="/my-orders" className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden w-full text-start">
                      My Orders
                    </Link>
                  </MenuItem>

                  <MenuItem>
                    <button
                      onClick={handleSignOut}
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden w-full text-start"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>

          </div>
        </div>

        {/* <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel> */}
      </Disclosure >

    </>
  )
}
