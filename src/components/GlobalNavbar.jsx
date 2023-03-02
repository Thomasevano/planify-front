import React, { useEffect } from "react";
import { Text, Navbar, Input, Button, Dropdown, Avatar, Link } from "@nextui-org/react";
import { SearchIcon } from "./icons/searchIcon";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../CurrentUserContext";
import authService from "../services/auth.service";
import { notify } from "../helpers/utils";

function GlobalNavbar({ setInputText, setLoginModalVisible, setRegisterModalVisible }) {
  const navigate = useNavigate();
  const { currentUser, fetchCurrentUser, logoutUser } = useCurrentUser();
  const userName = currentUser && currentUser.firstName + " " + currentUser.lastName;
  const userInitials = currentUser && currentUser.firstName[0] + currentUser.lastName[0];

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  function logout() {
    authService.logout();
    logoutUser();
    notify(200, "Vous êtes déconnecté !")
    navigate("/");
  }

  return (
    <Navbar shouldHideOnScroll variant="sticky">
      <Navbar.Brand>
        <Link href="/" color="inherit">
          Planify
        </Link>
      </Navbar.Brand>
      <Navbar.Content
        css={{
          "@xsMax": {
            w: "100%",
            jc: "space-between",
          },
        }}
      >
        <Navbar.Item
          css={{
            "@xsMax": {
              w: "100%",
              jc: "center",
            },
          }}
        >
          <Input
            clearable
            aria-label="Rechercher"
            onChange={inputHandler}
            contentLeft={
              <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
            }
            contentLeftStyling={false}
            css={{
              w: "100%",
              "@xsMax": {
                mw: "300px",
              },
              "& .nextui-input-content--left": {
                h: "100%",
                ml: "$4",
                dflex: "center",
              },
            }}
            placeholder="Search..."
          />

        </Navbar.Item>
      </Navbar.Content>
      {currentUser ? (
        <Navbar.Content>
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  text={userInitials}
                  size="md"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User Menu actions"
              color="primary"
              onAction={(actionKey) => actionKey === 'logout' ? logout() : navigate('/' + actionKey)}
            >
              <Dropdown.Item key="profile" css={{ height: "$24" }}>
                <Text b color="inherit" css={{ d: "flex" }}>Connecté en tant que</Text>
                <Text b color="inherit" css={{ d: "flex" }}>{userName}</Text>
                <Text color="inherit" css={{ d: "flex" }}>{currentUser.email}</Text>
              </Dropdown.Item>
              {currentUser.role === "retailer" &&
                <Dropdown.Item key="dashboard" withDivider>
                  Tableau de bord
                </Dropdown.Item>
              }
              <Dropdown.Item key="logout" withDivider color="error">
                Se déconnecter
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      ) : (
        <Navbar.Content>
          <Navbar.Item>
            <Button auto flat color="secondary" onPress={() => setLoginModalVisible(true)}>
              Se connecter
            </Button>
          </Navbar.Item>
          <Navbar.Item>
            <Button auto flat color="primary" onPress={() => setRegisterModalVisible(true)}>
              S'inscrire
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      )
      }
    </Navbar >
  )
}

export default GlobalNavbar
