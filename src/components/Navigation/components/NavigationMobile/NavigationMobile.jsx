import { HamburgerIcon } from "@chakra-ui/icons";
import "../../../.././App.css";
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { navigationsLinks } from "../../navigationConts";

const NavigationMobile = ({
  setActive,
  active,
  user,
  handleLogout,
  navLinksActive,
  setNavLinksActive,
}) => {
  const userId = user?.uid;
  console.log("userid", userId);
  console.log("name", user?.displayName);
  return (
    <Box
      color="blue.600"
      padding="2rem"
      backgroundColor="white"
      display={{ base: "block", md: "none" }}
    >
      <Flex alignItems="center" justifyContent="space-between" gap="1rem">
        {/* LOGO LINK MOBILE */}
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

        <Button
          padding={"0.5rem"}
          colorScheme="twitter"
          fontSize={"0.8rem"}
          fontWeight="medium"
        >
          CREATE
        </Button>

        {/* NAV LINKS MOBILE */}

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            {navigationsLinks.map((item) => {
              return <NavigationLink key={item.title} {...item} />;
            })}
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default NavigationMobile;

const NavigationLink = ({ title, link, icon }) => {
  return (
    <Link to={link}>
      <MenuItem alignItems={"center"} gap="0.5rem">
        {icon}
        {title}
      </MenuItem>
    </Link>
  );
};
