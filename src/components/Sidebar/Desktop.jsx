import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Icon, Divider, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Desktop(props) {
  const { expandSidebar, links, handleExpandSidebar } = props;

  const currentYear = new Date().getFullYear();

  return (
    <>
      {!expandSidebar && (
        <IconButton
          onClick={handleExpandSidebar}
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 9999,
            color: '#323a52',
          }}
        >
          <MenuIcon sx={{ fontSize: 32 }} />
        </IconButton>
      )}

      {expandSidebar && (
        <aside className="block h-screen w-60 overflow-auto bg-[#1C253F] z-9999">
          <div className="flex h-full w-full flex-col justify-between pt-4">
            <div>
              {/* Botão para fechar o menu */}
              <div className="flex justify-end pr-4">
                <IconButton onClick={handleExpandSidebar} style={{ color: 'white' }}>
                  <MenuIcon sx={{ fontSize: 32 }} />
                </IconButton>
              </div>

              <header className="flex flex-col items-center gap-y-5 px-5 pb-11">
                <Link to="/dashboard">
                  <img src="/assets/pgcomp_2.png" alt="Logo" className="block w-52" />
                </Link>
              </header>
              <ul className="flex w-full flex-col items-center">
                {links.map((link) => (
                  <li key={link.name} className="w-full text-white hover:bg-[#323a52]">
                    <NavLink
                      to={link.path}
                      className="flex h-full w-full items-center justify-start gap-x-2 border-l-4 border-transparent py-4 px-5 text-base outline-none hover:border-blue-500 hover:bg-blue-100 focus:outline-none"
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? '#323a52' : 'transparent',
                        borderColor: isActive ? '#3b82f6' : 'transparent',
                      })}
                    >
                      <Icon sx={{ fontSize: 32 }}>{link.icon}</Icon>
                      <span className="text-center font-inter font-medium text-white">
                        {link.name}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pb-4">
              <Divider className="bg-white" variant="middle" />
              <div className="flex flex-col items-center">
                <a href="/" className="block p-2 text-center font-poppins font-semibold text-white">
                  Sistema de Gerenciamento de Bolsas
                </a>
                <span className="text-white"> {currentYear} &copy; </span>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
