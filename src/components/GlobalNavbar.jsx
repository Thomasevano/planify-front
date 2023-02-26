import React from "react";
import { Text, Navbar, Input, Button, Dropdown, Avatar } from "@nextui-org/react";
import { SearchIcon } from "./icons/searchIcon";
import { useNavigate } from "react-router-dom";

function GlobalNavbar({ setInputText, currentUser, setLoginModalVisible, setRegisterModalVisible, logout }) {
  const navigate = useNavigate();
  const userName = currentUser && currentUser.firstName + " " + currentUser.lastName;
  const userInitials = currentUser && currentUser.firstName[0] + currentUser.lastName[0];

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <Navbar shouldHideOnScroll variant="sticky">
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          Planify
        </Text>
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
              <Dropdown.Item key="profile" css={{ height: "$24"}}>
                <Text b color="inherit" css={{d:"flex"}}>Connecté en tant que</Text>
                <Text b color="inherit" css={{d:"flex"}}>{userName}</Text>
                <Text color="inherit" css={{d:"flex"}}>{currentUser.email}</Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                Paramètres
              </Dropdown.Item>
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
