import { NavLink, useLocation } from "react-router-dom";
import { MdDashboard, MdOutlineSettings } from "react-icons/md";

import craveCrusherlogo from "../../../../public/crave-crusher-logo.svg";
import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { FaQuora } from "react-icons/fa";
import { CiUser } from "react-icons/ci";

const Sidebar = () => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const settings = [
    {
      name: "Privacy Policy",
      link: "/privacy-policy",
    },

    {
      name: "Terms & condition",
      link: "/terms-and-condition",
    },

    { name: "Profile Settings", link: "/profile" },
    { name: "Log out", link: "/login" },
  ];

  const dashBoard = {
    name: "Dashboard",
    link: "/",
    icon: <MdDashboard />,
  };

  const menuItems = [
    {
      name: "FAQ",
      link: "/faq",
      icon: <FaQuora />,
    },
    {
      name: "Manage User",
      link: "/users",
      icon: <CiUser />,
    },
  ];
  const isSettingsActive = location.pathname.includes("/settings");

  return (
    <div className=" w-[300px] h-[96vh] overflow-y-scroll px-3">
      <div className="flex items-center justify-center flex-col">
        <img src={craveCrusherlogo} alt="crave-icon" />
        <div className="text-2xl font-poppins text-[#6C63FF] font-semibold">
          Crave Crusher
        </div>
      </div>

      <ul className="mt-10">
        {/* Dashboard */}
        <NavLink
          to={dashBoard?.link}
          className={({ isActive }) =>
            `flex items-center py-3 rounded-3xl my-1 pl-6 hover:!bg-[#6C63FF] cursor-pointer hover:text-white ${
              isActive ? "!bg-[#6C63FF] text-white" : ""
            }`
          }
        >
          <span className="mr-4 text-xl">{dashBoard.icon}</span>
          <span>{dashBoard.name}</span>
        </NavLink>

        {/* Remaining menu items */}
        {menuItems.map((item, index) => (
          <NavLink
            to={item?.link}
            key={`remaining-${index}`}
            className={({ isActive }) =>
              `flex items-center py-3 rounded-3xl my-1 pl-6 hover:!bg-[#6C63FF] cursor-pointer hover:text-white ${
                isActive ? "!bg-[#6C63FF] text-white" : ""
              }`
            }
          >
            <span className="mr-4 text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}

        {/* Settings */}
        <li className="my-1">
          <div
            className={`flex items-center justify-between py-3 rounded-3xl pl-6 cursor-pointer ${
              isSettingsActive
                ? "!bg-[#6C63FF] !text-white"
                : "hover:!bg-[#6C63FF] hover:text-white"
            }`}
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <div className="flex items-center">
              <span className="mr-4 text-xl">
                <MdOutlineSettings />
              </span>
              <span>Settings</span>
            </div>
            <span className="mr-4">
              {isSettingsOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
            </span>
          </div>

          {isSettingsOpen && (
            <div className="ml-4">
              {settings.map((subItem, idx) => (
                <NavLink
                  key={idx}
                  to={subItem.link}
                  className={({ isActive }) =>
                    `flex items-center py-2 px-6 my-1 rounded-xl hover:bg-[#6C63FF] hover:text-white 
                      ${isActive ? "bg-[#6C63FF] text-white" : "bg-[#d6d4fc]"}`
                  }
                >
                  <span className="ml-6">{subItem.name}</span>
                </NavLink>
              ))}
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
