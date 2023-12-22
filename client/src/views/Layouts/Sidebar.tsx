import "@sass/layouts/sidebar.scss"

import ApplicationLogo from "@Components/ApplicationLogo";
import ArrowIcon from '@Icons/Arrow';
import { ElementType, MouseEventHandler, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Logout, OptionDots, Profile, Billet, ProfileEdit } from "../Components/Icons/IconSidebar";
import axios from "axios";
import { apiUrl } from "@/config";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  user: {
    name: string;
    role: string;
  }
  state: boolean;
  setState: (state: boolean) => void;
}

export default function Sidebar({ user, state, setState }: SidebarProps) {
  const navigate = useNavigate()

  const [labelBilletActive, setLabelBilletActive] = useState(false)
  const [labelProfileActive, setLabelProfileActive] = useState(false)

  return (
    <nav id='sidebar' className={`${state ? "active" : ""}`}>
      <div className='container-sidebar'>
        <div className='section-wrapper'>
          <div className={`header-wrapper ${state ? "active" : ""}`}>
            <a href="/">
              <ApplicationLogo
                className="block h-10 text-gray-800 fill-current"
                logoFull={state ? true : false}
              />
            </a>

            <div className='border-line' />
          </div>

          <div className='menu-wrapper'>
            <MenuItem
              onClick={(e) => {
                e.preventDefault();
                navigate("/dashboard");
              }}
              state={state}
              labelState={labelBilletActive}
              setLabelState={setLabelBilletActive}
              icon={{ main: Billet }}
            >
              Billet Line
            </MenuItem>
          </div>
        </div>

        <div className='section-wrapper'>
          <MenuItem
            state={state}
            labelState={labelProfileActive}
            setLabelState={setLabelProfileActive}
            icon={{ main: Profile, option: OptionDots }}
            desc={user.role}
            type="profile"
          >
            {user.name}
          </MenuItem>
        </div>
      </div>

      <div className='btn-expand'>
        <button
          className={`icon-btn ${state ? "active" : ""}`}
          onClick={() => setState(!state)}
        >
          <ArrowIcon />
        </button>
      </div>
    </nav>
  )
}

interface MenuItemProps {
  state: boolean;
  labelState: boolean;
  setLabelState: (state: boolean) => void;
  icon: {
    main: ElementType;
    option?: ElementType;
  }
  desc?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: string;
  type?: string;
}

function MenuItem({ state, labelState, setLabelState, icon, desc, onClick, children, type }: MenuItemProps) {

  const { main: Icon, option: Option } = icon;
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    setLabelState(true);
  };

  const handleMouseLeave = () => {
    setLabelState(false);
  };

  const [optionActive, setOptionActive] = useState(false)

  return (
    <div
      className={'icon-sidebar' + " " + (optionActive ? "menu-active" : "")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button type="button" className={'wrapper ' + (state ? "justify-start" : "justify-center")} onClick={(e) => {
        e.preventDefault()
        onClick && onClick(e)
        setOptionActive(!optionActive)
      }}>
        <Icon className="w-8 h-8" />
        {state && children && (
          <>
            <div className={"w-28 text-left " + (desc ? "flex flex-col" : "")}>
              <span className="font-semibold text-md">{children}</span>
              {desc && (
                <span className="text-xs">{desc}</span>
              )}
            </div>

            {Option && (
              <div className="absolute right-0">
                <Option className="mr-1 w-7 h-7" />
              </div>
            )}
          </>
        )}
      </button>

      {optionActive && type === "profile" && (
        <div className={"absolute overflow-hidden text-sm text-slate-700 bg-slate-200 border border-gray-300 rounded-lg bottom-14 shadow-xl" + " " + (state ? "w-full" : "w-36")}>

          {/* <div className="transition-colors hover:bg-slate-300">
            <button className="flex items-center w-full gap-3 p-2" type="button" onClick={async (e) => {
              e.preventDefault()
              setOptionActive(false)

              const response = await axiosJWT.get(`${apiUrl()}/profile`)

              if (response.data.success) {
                navigate('/profile')
              }
            }}>
              <ProfileEdit className="w-6" />
              <span>Profil</span>
            </button>
          </div> */}

          <div className="transition-colors hover:bg-slate-300">
            <button className="flex items-center w-full gap-3 p-2" type="button" onClick={async (e) => {
              e.preventDefault()
              setOptionActive(false)

              const response = await axios.get(`${apiUrl()}/logout`)

              if (response.data.success) {
                navigate('/')
                window.location.reload()
              }
            }}>
              <Logout />
              <span>Logout</span>
            </button>
          </div>

        </div>
      )}

      {labelState && children && !state && !optionActive && (
        <div className='menu-label'>
          <span className="border border-slate-400">{children}</span>
        </div>
      )}
    </div>
  );
}