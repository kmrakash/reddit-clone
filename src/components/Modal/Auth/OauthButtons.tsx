import { Button, Image, Stack, Text } from "@chakra-ui/react"
import React from "react"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { auth } from "../../../firebase/clientApp"

const OauthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

  return (
    <Stack mb={2} width='100%'>
      <Button
        variant='oauth'
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image
          src='/images/googlelogo.png'
          alt='Google Logo'
          height='20px'
          mr={2}
        />
        Continue with Google
      </Button>
      <Button variant='oauth'>Some Other Providers</Button>
      {error && (
        <Text textAlign='center' fontSize='10pt' color='red.500'>
          {error?.message}
        </Text>
      )}
    </Stack>
  )
}
export default OauthButtons
