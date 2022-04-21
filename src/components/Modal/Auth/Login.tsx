import { Button, Flex, Input, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { useSetRecoilState } from "recoil"
import { authModalState } from "../../../atoms/authModalAtom"
import { auth } from "../../../firebase/clientApp"

type LoginProps = {}

const defaultStyle = {
  bg: "white",
  border: "1px solid",
  borderColor: "blue.500",
}

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState)

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  // Firebase Logic To Sign In
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth)

  //   Submit Logic
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    signInWithEmailAndPassword(loginForm.email, loginForm.password)
  }

  //   OnChange Logic
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        // border: "1px solid blue",
        width: "100%",
      }}
    >
      <Flex direction='column' gap='2' width='100%'>
        <Input
          name='email'
          placeholder='email'
          type='email'
          required
          onChange={handleChange}
          _placeholder={{
            color: "gray.500",
          }}
          _hover={{
            ...defaultStyle,
          }}
          _focus={{
            outline: "none",
            ...defaultStyle,
          }}
          bg='gray.50'
        />
        <Input
          name='password'
          placeholder='password'
          type='password'
          required
          onChange={handleChange}
          _placeholder={{
            color: "gray.500",
          }}
          _hover={{
            ...defaultStyle,
          }}
          _focus={{
            outline: "none",
            ...defaultStyle,
          }}
          bg='gray.50'
        />

        {error && (
          <Text textAlign='center' fontSize='10pt' color='red.500'>
            {error?.message}
          </Text>
        )}

        <Button type='submit' h='36px' isLoading={loading}>
          Log In
        </Button>

        <Flex fontSize='9pt' justifyContent='center' gap='1'>
          <Text>New to here ?</Text>
          <Text
            color='blue.500'
            fontWeight={700}
            cursor='pointer'
            textTransform='uppercase'
            onClick={() => {
              setAuthModalState((prev) => ({
                ...prev,
                view: "signup",
              }))
            }}
          >
            Sign Up
          </Text>
        </Flex>
      </Flex>
    </form>
  )
}
export default Login
