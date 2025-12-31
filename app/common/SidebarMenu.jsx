import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';
import { RxCross1 } from './Icons';
import logoDark from '../../assets/logo-dark.svg';
import logo from '../../assets/logo.svg';
import logoutArrow from '../../assets/icon/logoutArrow.png';

const SidebarMenu = ({
  open,
  setOpen,
  loggedIn,
  userData,
  theme,
  handleLogout,
  router,
}) => {
  const isDarkTheme = theme === 'dark';
  const userVideoMins = userData ? userData.videomins : 5;
  const userTypeClass = userData?.usertype === 'free' ? 'text-[#3FB81B] bg-[#E8FFE7]' : 'text-[#FFFFFF] bg-[#D100D5]';
  const progressBarWidth = userData ? (userVideoMins <= 2 ? userVideoMins * 33 : 66 + 34 * (userVideoMins - 2)) : 0;

  return (
    <div
      className={`md:hidden fixed top-0 left-0 ${
        open ? 'visible' : '-translate-x-[50rem] invisible'
      } flex flex-col gap-7 h-screen w-[80%] z-50 bg-transperant dark:bg-[#29292B] dark:border-[#29292B] p-5 pl-7 sm:pl-15`}
    >
      <div className="flex items-center justify-between text-black">
        <Link href="/">
          <Image
            width={150}
            height={60}
            src={isDarkTheme ? logoDark : logo}
            alt="Logo"
          />
        </Link>
        <button onClick={() => setOpen(false)} className="rounded bg-tertiary">
          <RxCross1
            className="font-bold text-xl h-[35px] w-[35px] p-[8px] dark:text-white dark:bg-[#FFFFFF0F] dark:border dark:border-[#29292B] rounded-lg"
            style={{
              boxShadow: isDarkTheme ? '-13px 8px 18px 0px #FFFFFF29 inset' : '',
            }}
          />
        </button>
      </div>
      <div className="mt-[50px] flex flex-col gap-7">
        {loggedIn ? (
          <>
            <Link href="/workspace/projects">My folder</Link>
            <Link href="/pricing">Increase min</Link>
            <Link href="/feedback">Feedback</Link>
          </>
        ) : (
          <>
            <Link href="/pricing">Pricing</Link>
            <Link href="/#features">Features</Link>
          </>
        )}
      </div>
      {loggedIn && (
        <div className="flex flex-col items-center justify-end h-full py-4">
          <div className="text-stone-800 dark:text-[#EDEDED]">
            <span className="mr-2 font-semibold">{userVideoMins}</span>
            <span className="text-stone-600 dark:text-[#EDEDED]">mins remaining</span>
          </div>
          <div className="w-[200px] bg-gray-200 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full ${userVideoMins === 0 ? 'bg-red-500' : 'bg-[#00BE13]'}`}
              style={{ width: `${progressBarWidth}%` }}
            />
          </div>
          <div className="border border-stone-300 dark:border-[#FFFFFF14] mt-3 rounded-full p-2 flex items-center justify-between w-[208px]">
            <div className="flex items-center">
              {userData ? (
                <Image
                  width={25}
                  height={25}
                  src={userData.image}
                  alt="User"
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="px-2 py-1 font-semibold text-white bg-gray-800 rounded-full">
                  <h1>C</h1>
                </div>
              )}
              {userData && (
                <div className={`font-semibold px-2 py-1 text-[14px] rounded-full ${userTypeClass}`}>
                  {userData.usertype === 'free' ? 'Free' : 'Premium'}
                </div>
              )}
            </div>
            <Link
              href="/"
              className="flex items-center gap-1 cursor-pointer flex-shrink-0"
              onClick={handleLogout}
            >
              <p className="font-medium text-stone-700 dark:text-white whitespace-nowrap">Logout</p>
              <Image
                src={logoutArrow}
                alt="Logout"
                className="flex-shrink-0"
                style={{ filter: isDarkTheme ? 'invert(1)' : '' }}
              />
            </Link>
          </div>
          <div className="space-x-3 text-[12px] mt-2">
            <Link href="/terms-conditions" className="text-[#72727]">Terms & Conditions</Link>
            <Link href="/privacy-policy" className="text-[#72727]">Privacy Policy</Link>
          </div>
        </div>
      )}
      {!loggedIn && (
        <Button
          name="Get Started"
          buttonColor={isDarkTheme ? 'bg-black' : 'bg-[#FFFFFF08] shadow-[inset_-2px_2px_20px_0px_#FFFFFFEB]'}
          onClick={() => router.push('/login')}
        />
      )}
    </div>
  );
};

export default SidebarMenu;
