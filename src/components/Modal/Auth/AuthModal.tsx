import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { useRecoilState } from "recoil"
import { authModalState } from "../../../atoms/authModalAtom"
import AuthInputs from "./AuthInputs"
import OauthButtons from "./OauthButtons"

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState)

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
  }

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>
            {modalState.view === "login" && "Log In"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Flex
              direction='column'
              // border='1px solid red'
              justify='center'
              align='center'
              width='70%'
              pb={2}
            >
              {/* OauthButtons */}
              <OauthButtons />
              <Text color='gray.500' fontWeight={700} my={2}>
                OR
              </Text>
              {/* AuthInputs */}
              <AuthInputs />
              {/* ResetPassword */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal
