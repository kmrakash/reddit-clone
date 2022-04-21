import { Button, Flex, Input, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { useSetRecoilState } from "recoil"
import { authModalState } from "../../../atoms/authModalAtom"

type SignUpProps = {}

const defaultStyle = {
  bg: "white",
  border: "1px solid",
  borderColor: "blue.500",
}

const SignUp: React.FC<SignUpProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState)

  const [SignUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  //   Submit Logic
  const handleSubmit = () => {}

  //   OnChange Logic
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
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

        <Input
          name='confirmPassword'
          placeholder='confirm password'
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

        <Button type='submit' h='36px'>
          Sign Up
        </Button>

        <Flex fontSize='9pt' justifyContent='center' gap='1'>
          <Text>Already a Member ?</Text>
          <Text
            color='blue.500'
            fontWeight={700}
            cursor='pointer'
            textTransform='uppercase'
            onClick={() => {
              setAuthModalState((prev) => ({
                ...prev,
                view: "login",
              }))
            }}
          >
            Log In
          </Text>
        </Flex>
      </Flex>
    </form>
  )
}
export default SignUp
