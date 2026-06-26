import React from "react";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../common/Avatar";

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-50 shrink-0">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-surface2 border border-border text-slate-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <span className="font-display text-xl font-bold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent tracking-tight">
          Selkis
        </span>
      </div>

      {/* Right — User model: fullName, displayRole, initials, accentColor */}
      {user && (
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold leading-tight text-slate-200">{user.fullName}</p>
            <p className="text-xs text-muted">{user.displayRole}</p>
          </div>
          <Avatar initials={user.initials} color={user.accentColor} size="md" />
        </div>
      )}
    </header>
  );
};

export default Header;
