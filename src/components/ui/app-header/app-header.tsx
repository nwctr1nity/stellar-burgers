import React, { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          {[
            { to: '/', Icon: BurgerIcon, label: 'Конструктор', extra: 'mr-10' },
            { to: '/feed', Icon: ListIcon, label: 'Лента заказов', extra: '' }
          ].map(({ to, Icon, label, extra }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`${styles.link} ${active ? styles.link_active : ''}`}
              >
                <Icon type={active ? 'primary' : 'secondary'} />
                <p className={`text text_type_main-default ml-2 ${extra}`}>
                  {label}
                </p>
              </Link>
            );
          })}
        </div>
        <div className={styles.logo}>
          <Logo className={''} />
        </div>
        <div className={styles.link_position_last}>
          <Link
            to='/profile'
            className={`${styles.link} ${
              location.pathname.startsWith('/profile') ? styles.link_active : ''
            }`}
          >
            <ProfileIcon
              type={
                location.pathname.startsWith('/profile')
                  ? 'primary'
                  : 'secondary'
              }
            />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};
