import NavigationDesktop from "./components/NavigationDesktop/NavigationDesktop";
import NavigationMobile from "./components/NavigationMobile/NavigationMobile";

const Navigation = ({
  setActive,
  active,
  user,
  handleLogout,
  setNavLinksActive,
  navLinksActive,
}) => {
  return (
    <>
      <NavigationDesktop
        active={active}
        setActive={setActive}
        user={user}
        handleLogout={handleLogout}
        setNavLinksActive={setNavLinksActive}
        navLinksActive={navLinksActive}
      />
      <NavigationMobile
        active={active}
        setActive={setActive}
        user={user}
        handleLogout={handleLogout}
        setNavLinksActive={setNavLinksActive}
        navLinksActive={navLinksActive}
      />
    </>
  );
};

export default Navigation;
