import { Flex, Image } from "@chakra-ui/react"
import React from "react"
import RightContent from "./RIghtContent/RightContent"
import SearchInput from "./SearchInput"

const Navbar: React.FC = () => {
  return (
    <Flex bg='white' h='44px' p='6px 12px'>
      {/* Logo */}
      <Flex align='center'>
        <Image src='./images/redditFace.svg' alt='Reddit Face' h='30px' />
        <Image
          src='./images/redditText.svg'
          alt='Reddit Text'
          h='46px'
          display={{
            base: "none",
            md: "unset",
          }}
        />
      </Flex>

      {/* <Directory /> */}
      <SearchInput />
      <RightContent />
    </Flex>
  )
}
export default Navbar
