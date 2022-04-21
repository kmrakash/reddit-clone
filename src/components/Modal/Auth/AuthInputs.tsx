import { Flex } from "@chakra-ui/react"
import React from "react"
import { useRecoilValue } from "recoil"
import { authModalState } from "../../../atoms/authModalAtom"
import Login from "./Login"
import SignUp from "./SignUp"

type AuthInputsProps = {}

const AuthInputs: React.FC<AuthInputsProps> = () => {
  const authModalStateValue = useRecoilValue(authModalState)
  return (
    <Flex>
      {authModalStateValue.view === "login" && <Login />}

      {authModalStateValue.view === "signup" && <SignUp />}
    </Flex>
  )
}
export default AuthInputs
