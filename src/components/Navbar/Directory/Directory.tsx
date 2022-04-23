import { ChevronDownIcon } from "@chakra-ui/icons"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react"
import React from "react"

// React Icons
import { TiHome } from "react-icons/ti"
import Communities from "./Communities"

const UserMenu: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        cursor='pointer'
        p='1'
        mx={1.5}
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex
          align='center'
          gap={1}
          justify='space-between'
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align='center' gap={1} justify='space-between'>
            <Icon fontSize={24} as={TiHome} />
            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontSize='8pt' fontWeight={400}>
                Home
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon color='gray.500' fontSize={20} />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  )
}
export default UserMenu
