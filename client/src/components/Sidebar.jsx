import { useClerk, useUser } from '@clerk/clerk-react';
import { Image, Hash, House, SquarePen, Eraser, Scissors, FileText, Users } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  const navItems = [
    { to: '/ai', label: 'Dashboard', Icon: House },
    { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
    { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
    { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
    { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
    { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
    { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
    { to: '/ai/community', label: 'Community', Icon:Users },
  ];

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col items-center max-sm:absolute top-14 bottom-0 
        ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}
    >
      {/* User Info */}
      <div className="my-7 w-full text-center">
        <img
          src={user?.imageUrl}
          alt="user avatar"
          className="w-14 h-14 rounded-full mx-auto"
        />
        <h1 className="font-medium mt-2">{user?.fullName}</h1>
      </div>

      {/* Navigation */}
      <div className="w-full">
        {navItems.map(({ to, label, Icon }) => (
          <div key={to} className="w-full">
            <NavLink
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded w-full ${
                  isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : ''
                } hover:bg-gray-100 transition-colors`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Sidebar;
