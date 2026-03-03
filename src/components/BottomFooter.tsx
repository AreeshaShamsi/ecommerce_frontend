import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCrown,
  faTags,
  faListAlt,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";


interface NavItem {
  label: string;
  icon: IconDefinition;
  path: string;
  center?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", icon: faHouse, path: "/" },
  { label: "Plans", icon: faListAlt, path: "/user/plans" },
  { label: "VIP Plans", icon: faCrown, path: "/user/speedtest", center: true },
  { label: "Offers", icon: faTags, path: "/user/offers" },
  { label: "Services", icon: faHeadset, path: "/user/complaints" },
];

export default function BottomFooter(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex: number = navItems.findIndex(
    (item) => item.path === location.pathname
  );
  const [animating, setAnimating] = useState<boolean>(false);

  // Animation handler for speedtest
  const handleSpeedtestClick = (): void => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      navigate(navItems[2].path);
    }, 350);
  };

  const handleNavigation = (index: number): void => {
    if (index === 2) {
      handleSpeedtestClick();
    } else {
      navigate(navItems[index].path);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full">
      {/* Compact white footer with rounded top corners */}
      <div 
        className="relative bg-white shadow-lg"
        style={{
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: '0 -2px 15px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Navigation items */}
        <div className="flex justify-around items-center px-3 py-2.5">
          {navItems.map((item, index) => {
            const isActive: boolean = currentIndex === index;
            
            return (
              <button
                key={index}
                onClick={() => handleNavigation(index)}
                className={`flex flex-col items-center justify-center min-w-[55px] py-1.5 transition-all duration-300 ${
                  isActive 
                    ? 'text-yellow-400' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`mb-0.5 transition-all ${isActive ? 'text-lg' : 'text-base'}`}
                  style={{
                    fontWeight: isActive ? 600 : 400
                  }}
                />
                <span 
                  className={`text-[10px] transition-all ${isActive ? 'font-semibold' : 'font-normal'}`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}