import DashboardIcon from "../assets/DashboardIcon.png";
import TwoTickets from "../assets/TwoTickets.png";
import NewTicket from "../assets/NewTicket.png";
import Vector from "../assets/Vector.png";
import Group from "../assets/Group.png";
import Vector1 from "../assets/Vector1.png";
import Vector2 from "../assets/Vector2.png";
import ProfileDetails from "./ProfileDetails";
import DashboardMain from "./Dashboard";
import { useState } from "react";

interface HelpDeskProps {
  onLogout?: () => void;
  showProfile?: boolean;
  setShowProfile?: (show: boolean) => void;
}

export default function HelpDesk({
  onLogout,
  showProfile,
  setShowProfile,
}: HelpDeskProps) {
  const [showDashboard, setShowDashboard] = useState(true);

  const handleDashboardClick = () => {
    setShowDashboard(true);
    setShowProfile && setShowProfile(false);
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <nav className="bg-[#55D6C2] h-24 flex items-center px-6">
        <h1 className="text-[48px] text-white italic font-[roboto] font-bold">
          Helpdesk
        </h1>
        <div className="flex-1 flex justify-end gap-3 items-center ml-AUTO">
          <img src={Group} alt="BM BI" className="w-[75px] h-6" />
          <img src={Vector1} alt="Notification" className="w-4 h-5 mx-2" />
          <img
            src={Vector2}
            alt="User Icon"
            className="w-6 h-5 mx-2 cursor-pointer"
            onClick={() => {
              setShowProfile && setShowProfile(true);
              setShowDashboard(false);
            }}
            title="Profile"
          />
          {onLogout ? (
            <img
              src={Vector}
              alt="logout"
              className="w-6 h-4 cursor-pointer"
              onClick={onLogout}
              title="Logout"
            />
          ) : (
            <img src={Vector} alt="logout" className="w-6 h-4" />
          )}
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-[250px] bg-[#6A67674D] flex flex-col items-center pt-6">
          <div className="flex flex-col w-full space-y-6 px-4">
            {/* Dashboard */}
            <div
              className="flex items-center gap-3 py-2 cursor-pointer hover:bg-[#55D6C2] rounded px-2"
              onClick={handleDashboardClick}
            >
              <img
                src={DashboardIcon}
                alt="Dashboard Icon"
                className="w-6 h-6"
              />
              <span className="text-white text-[22px] font-[Sanchez]">
                Dashboard
              </span>
            </div>

            {/* New Ticket */}
            <div className="flex items-center gap-3 py-2 cursor-pointer hover:bg-[#55D6C2] rounded px-2">
              <img src={NewTicket} alt="New Ticket Icon" className="w-6 h-6" />
              <span className="text-white text-[22px] font-[Sanchez]">
                New Ticket
              </span>
            </div>

            {/* My Ticket */}
            <div className="flex items-center gap-3 py-2 cursor-pointer hover:bg-[#55D6C2] rounded px-2">
              <img src={TwoTickets} alt="My Ticket Icon" className="w-6 h-6" />
              <span className="text-white text-[22px] font-[Sanchez]">
                My Ticket
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {showProfile ? (
            <ProfileDetails />
          ) : showDashboard ? (
            <DashboardMain />
          ) : (
            <div className="flex-1 p-4 bg-white"></div>
          )}

          <footer className="bg-[#55D6C2] h-12 flex items-center justify-center text-white">
            <p className="text-sm">&copy; 2025 Help Desk</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
