import React,{useContext} from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Avatar,AvatarBadge } from "@chakra-ui/react";
import AuthService from "../auth/AuthService";
import "../../styles/navbar.css"
import ThemeContext from "../context/ThemeProvider";
import PropTypes from "prop-types";


export default function NavBar({ onLogout }) {

  const { theme, toggleColorTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    AuthService.logout();
    onLogout();
  };

  return (
    <nav>
      <section className="brandsection">
        <h2>Asper</h2>
      </section>
      <section className="logoutsection">
        {theme==="#2e3c3ff1"?<SunIcon onClick={toggleColorTheme} />:<MoonIcon onClick={toggleColorTheme} />}
        <Avatar onClick={handleLogout} size='sm' >
          <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='1.25em' />
        </Avatar>
      </section>
    </nav>
  );
}


NavBar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};