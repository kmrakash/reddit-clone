import { Button, Flex } from "@chakra-ui/react"
import React from "react"

const AuthButtons: React.FC = () => {
  return (
    <>
      <Button
        variant='outline'
        mr={2}
        height='28px'
        display={{ base: "none", md: "flex" }}
        width={{ base: "70px", md: "110px" }}
        // onClick={() => {}}
      >
        Log In
      </Button>
      <Button
        height='28px'
        display={{ base: "none", md: "flex" }}
        width={{ base: "70px", md: "110px" }}
      >
        Sign Up
      </Button>
    </>
  )
}
export default AuthButtons
