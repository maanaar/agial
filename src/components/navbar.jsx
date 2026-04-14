import { NavLink } from "react-router-dom";
import { useState, useCallback } from "react";

const navItems = [
  {
    name: "Consultation Form",
    iconClass: "fa-solid fa-stethoscope",
    path: "/consultationform",
  },
  {
    name: "Medical Record",
    iconClass: "fa-solid fa-compass",
    path: "/medicalrecord",
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-50 w-full h-16 bg-white/70 backdrop-blur-md border-b bg-[linear-gradient(-90deg,#FFFFFF_0%,#D9E4EF_90%)] flex items-center justify-between px-4">
        <button
          onClick={toggleMobileMenu}
          className="p-2 text-[#14A3B8] hover:text-[#07626f] transition-colors"
          aria-label="Toggle menu"
        >
          <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 z-50
        w-[280px] h-screen
        bg-white/70 backdrop-blur-md border-r
        bg-[linear-gradient(-90deg,#FFFFFF_0%,#D9E4EF_90%)]
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
      

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-5 lg:px-6 py-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-[15px] lg:text-[16px] font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#14A3B8] text-white shadow-sm"
                      : "text-[#14A3B8] hover:bg-white/50 hover:text-[#07626f]"
                  }`
                }
              >
                <i className={`${item.iconClass} text-[18px]`}></i>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}