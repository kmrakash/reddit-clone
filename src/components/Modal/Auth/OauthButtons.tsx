import { Button, Image, Stack } from "@chakra-ui/react"
import React from "react"

const OauthButtons: React.FC = () => {
  return (
    <Stack mb={2} width='100%'>
      <Button variant='oauth'>
        <Image
          src='/images/googlelogo.png'
          alt='Google Logo'
          height='20px'
          mr={2}
        />
        Continue with Google
      </Button>
      <Button variant='oauth'>Some Other Providers</Button>
    </Stack>
  )
}
export default OauthButtons
