import { useLocation, useNavigate } from 'react-router-dom'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const AdminHeader = [
  { name: 'Admin', href: '/admin' },
  { name: 'Team', href: '/admin/team' },
  { name: 'Gallery', href: '/admin/gallery' },
  { name: 'Projects', href: '/admin/projects' },
  { name: 'Messages', href: '/admin/contact' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/login') // redirect to login
  }

  return (
    <Disclosure as="nav" className="relative bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-open:block" />
            </DisclosureButton>
          </div>

<div className="flex flex-1 items-center justify-center relative">
  
  {/* Navigation links centered */}
  <div className="hidden sm:flex space-x-6">
    {AdminHeader.map((item) => {
      const isCurrent = location.pathname === item.href;
      return (
        <a
          key={item.name}
          href={item.href}
          aria-current={isCurrent ? 'page' : undefined}
          className={classNames(
            isCurrent
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-white/5 hover:text-white',
            'rounded-md px-3 py-2 text-sm font-medium'
          )}
        >
          {item.name}
        </a>
      );
    })}
  </div>
</div>


          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
  onClick={handleSignOut}
  className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition"
>
  Sign Out
</button>


          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {AdminHeader.map((item) => {
            const isCurrent = location.pathname === item.href
            return (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={isCurrent ? 'page' : undefined}
                className={classNames(
                  isCurrent ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
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
