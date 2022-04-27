import { ChevronDownIcon } from "@chakra-ui/icons"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Icon,
  MenuDivider,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { signOut, User } from "firebase/auth"

// React Icons
import { FaRedditSquare } from "react-icons/fa"
import { VscAccount } from "react-icons/vsc"
import { IoSparkles } from "react-icons/io5"
import { CgProfile } from "react-icons/cg"
import { MdOutlineLogin } from "react-icons/md"
import { auth } from "../../../firebase/clientApp"
import { useResetRecoilState, useSetRecoilState } from "recoil"
import { authModalState } from "../../../atoms/authModalAtom"
import { communityState } from "../../../atoms/communityAtom"

type UserMenuProps = {
  user?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModelState = useSetRecoilState(authModalState)
  const resetCommunityState = useResetRecoilState(communityState)
  const logout = () => {
    signOut(auth)
    resetCommunityState()
  }

  return (
    <Menu>
      <MenuButton
        cursor='pointer'
        p='1'
        mx={1.5}
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align='center' gap={1}>
          <Flex align='center'>
            {user ? (
              <>
                <Icon as={FaRedditSquare} color='gray.500' fontSize={24} />
                <Flex
                  direction='column'
                  display={{ base: "none", lg: "flex" }}
                  fontSize='8pt'
                  align='flex-start'
                  ml='1'
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user?.email?.split("@")[0]}
                  </Text>
                  <Flex>
                    <Icon as={IoSparkles} color='brand.100' />
                    <Text color='gray.400'>1 Karma</Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon fontSize={24} mr={1} color='gray.400' as={VscAccount} />
            )}
          </Flex>
          <ChevronDownIcon color='gray.500' fontSize={20} />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize='10pt'
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex align='center' gap={2}>
                <Icon as={CgProfile} fontSize={20} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize='10pt'
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={logout}
            >
              <Flex align='center' gap={2}>
                <Icon as={MdOutlineLogin} fontSize={22} />
                Log out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize='10pt'
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() =>
                setAuthModelState({
                  open: true,
                  view: "login",
                })
              }
            >
              <Flex align='center' gap={2}>
                <Icon as={MdOutlineLogin} fontSize={22} />
                Log In or Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  )
}
export default UserMenu
