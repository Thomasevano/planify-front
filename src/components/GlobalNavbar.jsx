import { Text, Navbar, Link, Input, Button } from "@nextui-org/react";
import { SearchIcon } from "./icons/searchIcon";

function GlobalNavbar({ setInputText, currentUser }) {

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
          <p>connecté</p>
        </Navbar.Content>
      ) : (
        <Navbar.Content>
          <Navbar.Link color="inherit" href="/login">
            Se connecter
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat href="/register">
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
