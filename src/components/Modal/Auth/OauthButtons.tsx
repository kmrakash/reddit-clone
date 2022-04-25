import { Button, Image, Stack, Text } from "@chakra-ui/react"
import { User } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import React, { useEffect } from "react"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { auth, firestore } from "../../../firebase/clientApp"

const OauthButtons: React.FC = () => {
  const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth)

  // A function to create user collection on firestore on new sign ups
  const handleCreateUserDocument = async (user: User) => {
    try {
      const userDocRef = doc(firestore, "users", user.uid)
      await setDoc(userDocRef, JSON.parse(JSON.stringify(user)))
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userCred) {
      handleCreateUserDocument(userCred.user)
    }
  }, [userCred])

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
