import { useLocation, useNavigate } from 'react-router-dom'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const AdminHeader = [
  { name: 'Admin', href: '/admin' },
  { name: 'Team', href: '/admin/team' },
  { name: 'Gallery', href: '/admin/gallery' },
  { name: 'Projects', href: '/admin/projects' },
  { name: 'Messages', href: '/admin/contact' },
  { name: 'Blog', href: '/admin/blogs' }

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <Disclosure as="nav" className="relative bg-gray-800">
      <div className="mx-auto max-w-7xl px-3 sm:px-8 lg:px-10">
        <div className="relative flex h-24 items-center justify-between">
          {/* mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-3 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-8 w-8 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-8 w-8 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* centered nav links */}
          <div className="flex flex-1 items-center justify-center relative">
            <div className="hidden sm:flex space-x-8">
              {AdminHeader.map((item) => {
                const isCurrent = location.pathname === item.href
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={classNames(
                      isCurrent
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white',
                      'rounded-md px-5 py-3 text-lg font-semibold'
                    )}
                  >
                    {item.name}
                  </a>
                )
              })}
            </div>
          </div>

          {/* sign out button */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:static sm:inset-auto sm:ml-8 sm:pr-0">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-800 text-base font-medium hover:bg-gray-50 hover:text-gray-900 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu panel */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-2 px-3 pt-3 pb-4">
          {AdminHeader.map((item) => {
            const isCurrent = location.pathname === item.href
            return (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={isCurrent ? 'page' : undefined}
                className={classNames(
                  isCurrent
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white',
                  'block rounded-md px-5 py-3 text-lg font-semibold'
                )}
              >
                {item.name}
              </DisclosureButton>
            )
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
