import { Button, Flex, Input, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { useSetRecoilState } from "recoil"
import { authModalState } from "../../../atoms/authModalAtom"

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

  //   Submit Logic
  const handleSubmit = () => {}

  //   OnChange Logic
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction='column' gap='2'>
        <Input
          name='email'
          placeholder='email'
          type='email'
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

        <Button type='submit'>Log In</Button>

        <Flex fontSize='9pt' justifyContent='center' gap='1'>
          <Text>New to here ?</Text>
          <Text
            color='blue.500'
            fontWeight={700}
            cursor='pointer'
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
