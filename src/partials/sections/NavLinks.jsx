import React from "react";
import { useAuth } from "../../contexts";
import NavLinkItem from "../components/NavLinkItem";

const NavLinks = () => {
  const { auth } = useAuth();

  return (
    <nav className="nav-links">
      <NavLinkItem
        to="/admin/projects"
        text="Projects"
        iconclassName="fa-duotone fa-solid fa-briefcase"
      />

      {auth.role === "admin" && (
        <>
          <NavLinkItem
            to="/admin/members"
            text="Members"
            iconclassName="fa-duotone fa-solid fa-user-group"
          />
          <NavLinkItem
            to="/admin/clients"
            text="Clients"
            iconclassName="fa-duotone fa-solid fa-handshake"
          />
        </>
      )}
    </nav>
  );
};

export default NavLinks;
