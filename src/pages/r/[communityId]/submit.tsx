import { Box, Text } from "@chakra-ui/react"
import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import About from "../../../components/Community/About"
import PageContent from "../../../components/Layout/PageContent"
import NewPostForm from "../../../components/Post/PostForm/NewPostForm"
import { auth } from "../../../firebase/clientApp"
import useCommunityData from "../../../hooks/useCommunityData"

type submitProps = {}

const Submit: React.FC<submitProps> = () => {
  const [user] = useAuthState(auth)
  const { communityStateValue } = useCommunityData()

  return (
    <PageContent>
      <>
        <Box p='14px 0px' borderBottom='1px solid' borderColor='white'>
          <Text fontWeight={600}>Create a post</Text>
        </Box>
        {/* NewPostForm */}
        {user && <NewPostForm user={user} />}
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  )
}
export default Submit
