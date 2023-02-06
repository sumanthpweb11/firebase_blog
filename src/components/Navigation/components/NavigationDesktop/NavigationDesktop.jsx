import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { navigationLinkCreate, navigationsLinks } from "../../navigationConts";
import "../../../../App.css";
const NavigationDesktop = ({
  active,
  setActive,
  user,
  handleLogout,
  navLinksActive,
  setNavLinksActive,
}) => {
  const userId = user?.uid;
  // console.log("userid", userId);
  // console.log("name", user?.displayName);
  return (
    <Box
      color="blue.600"
      paddingY="2rem"
      backgroundColor="white"
      display={{ base: "none", md: "block" }}
    >
      <Box maxWidth="1280px" margin="0 auto">
        <Flex alignItems="center" justifyContent="space-between">
          {/* LOGO LINK */}
          <Link to="/">
            <Box
              className={`${navLinksActive ? "active-class" : "null"}`}
              display={"flex"}
              alignItems="center"
              gap={"2"}
            >
              <AiFillHome />
              <Text fontFamily={"2xl"} fontWeight="black">
                Blog
              </Text>
            </Box>
          </Link>

          {/* NAV LINKS */}
          <Flex gap={"12"} alignItems="center" fontFamily={"medium"}>
            {navigationsLinks.map((item, index) => {
              return (
                <Box
                  key={index}
                  paddingY="0.5rem"
                  paddingX="1rem"
                  className={`${active === index ? "active-class" : null}`}
                  onClick={() => setActive(index)}
                >
                  <NavigationLink key={item.title} {...item} />
                </Box>
              );
            })}

            {user &&
              navigationLinkCreate.map((item, index) => {
                return (
                  <Box
                    key={index}
                    paddingY="0.5rem"
                    paddingX="1rem"
                    className={`${active === index ? "active-class" : null}`}
                    onClick={() => setActive(index)}
                  >
                    <NavigationLink key={item.title} {...item} />
                  </Box>
                );
              })}

            {userId ? (
              <>
                <Box
                  display="flex"
                  alignItems="center"
                  className="profile-logo "
                  gap="0.3rem"
                >
                  <img
                    src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
                    alt="logo"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <p>{user?.displayName}</p>
                  <Text cursor="pointer" onClick={handleLogout}>
                    Logout
                  </Text>
                </Box>
              </>
            ) : (
              <>
                <Link to="/auth">Login</Link>
              </>
            )}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default NavigationDesktop;

const NavigationLink = ({ title, link, icon }) => {
  return (
    <Link to={link}>
      <Flex alignItems={"center"} gap="0.5rem">
        {icon}
        {title}
      </Flex>
    </Link>
  );
};
