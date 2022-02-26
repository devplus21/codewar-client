import Button from 'components/Button';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import banner from '../assets/banner.png';
const routing = [
  { path: '/problem', display: 'Luyện Tập', icon: 'bx bxs-grid' },
  { path: '/contest', display: 'Thi Đấu', icon: 'bx bxs-trophy' },
  { path: '/rank', display: 'Xếp hạng', icon: 'bx bxs-bar-chart-alt-2' },
  { path: '/upload', display: 'Bài nộp', icon: 'bx bxs-cloud-upload' },
];
export default function Navigation() {
  const { pathname } = useLocation();
  const activeNav = routing.findIndex((e) => e.path === pathname);

  const [user, setUser] = useState({});

  return (
    <div className="header">
      <div className="container">
        <div className="header__menu">
          <div className="header__menu__banner">
            <Link to="/">
              <img src={banner} alt="" />
            </Link>
          </div>
          {routing.map((route, index) => (
            <Link
              to={route.path}
              key={index}
              className={`header__menu__item ${index === activeNav ? 'active' : ''}`}
            >
              <i className={route.icon}></i>
              <span>{route.display}</span>
            </Link>
          ))}
        </div>

        <div className="header__account">
          {/* use auth is true to show account info or show button loggin  */}

          {!user ? (
            <div className="header__account__info">
              <span>Nguyễn Thanh Hòa</span>
              <div className="header__account__info-avatar">
                <img src="" alt="avatar" />
              </div>
            </div>
          ) : (
            <Button backgroundColor="main" size="" icon="" onClick={() => console.log('logging')}>
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}