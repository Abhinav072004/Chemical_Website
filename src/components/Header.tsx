import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/chemical-logo.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: 'Home', href: '/', exact: true },
    { 
      name: 'About', 
      href: '/about',
      dropdown: [
        { name: 'Department Overview', href: '/about#overview' },
        { name: 'Vision & Mission', href: '/about#vision' },
        { name: 'History', href: '/about#history' }
      ]
    },
    { 
      name: 'Academics', 
      href: '/academics',
      dropdown: [
        { name: 'Undergraduate', href: '/students/ug' },
        { name: 'Postgraduate', href: '/students/pg' },
        { name: 'PhD Programs', href: '/students/phd' }
      ]
    },
    { 
      name: 'Faculty', 
      href: '/faculty',
      dropdown: [
        { name: 'Core Faculty', href: '/faculty/core' },
        { name: 'Visiting/Distinguished Faculty', href: '/faculty/visiting' },
        { name: 'Associate Faculty', href: '/faculty/associate' },
        { name: 'Advisory Committee', href: '/faculty/advisory' },
        { name: 'Working Committee', href: '/faculty/working' },
        { name: 'Convenor', href: '/faculty/convenor' }
      ]
    },
    { name: 'Research', href: '/research' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden flex items-center justify-center bg-blue-800">
              <img 
                src={logoImg}
                alt="Chemical Engineering Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
              <div className="hidden w-full h-full items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-xl">IIT</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">IIT Indore</h1>
              <p className="text-sm lg:text-base text-gray-600">Chemical Engineering</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative flex items-center h-full"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center font-medium transition-colors duration-200 py-2 ${
                    location.pathname === item.href ? 'text-blue-800' : 'text-gray-700 hover:text-blue-800'
                  }`}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>
                
                {/* Dropdown Menu - FIXED GAP ISSUE */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 w-56 z-50">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                      <div className="py-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors duration-200"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-800 hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                      location.pathname === item.href ? 'text-blue-800 bg-blue-50' : 'text-gray-700 hover:text-blue-800 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-800 hover:bg-gray-50 rounded-md transition-colors duration-200"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;