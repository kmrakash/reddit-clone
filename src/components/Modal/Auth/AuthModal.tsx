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
import React, { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRecoilState } from "recoil"
import { authModalState } from "../../../atoms/authModalAtom"
import { auth } from "../../../firebase/clientApp"
import AuthInputs from "./AuthInputs"
import OauthButtons from "./OauthButtons"
import ResetPassword from "./ResetPassword"

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState)

  const [user, loading, error] = useAuthState(auth)

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }))
  }

  // Add an Effect if user is already sign In
  useEffect(() => {
    if (user) handleClose()
  }, [user])

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
              {modalState.view === "resetPassword" ? (
                <ResetPassword />
              ) : (
                <>
                  {/* OauthButtons */}
                  <OauthButtons />
                  <Text color='gray.500' fontWeight={700} my={2}>
                    OR
                  </Text>
                  {/* AuthInputs */}
                  <AuthInputs />
                </>
              )}

              {/* ResetPassword */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal
