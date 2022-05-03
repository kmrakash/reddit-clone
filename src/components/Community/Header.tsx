import { Box, Button, Flex, Icon, Stack, Text, Image } from "@chakra-ui/react"
import React from "react"
import { FaReddit } from "react-icons/fa"
import { Community } from "../../atoms/communityAtom"
import useCommunityData from "../../hooks/useCommunityData"

type HeaderProps = {
  // community data
  communityData: Community
}

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, onLeaveOrJoinCommunity, loading } =
    useCommunityData()
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  )

  return (
    <Flex direction='column' height='146px' width='100%'>
      <Box bg='blue.500' height='50%' />
      <Flex height='50%' justifyContent='center' bg='white'>
        <Flex width='95%' maxWidth='984px'>
          {communityStateValue.currentCommunity?.imageURL ? (
            <>
              <Image
                src={communityStateValue.currentCommunity.imageURL}
                alt='community Logo'
                position='relative'
                top={-3}
                bg='white'
                boxSize='66px'
                // border='4px solid white'
                borderRadius='full'
              />
            </>
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position='relative'
              top={-3}
              color='blue.500'
              border='4px solid white'
              borderRadius='50%'
            />
          )}

          <Flex padding='10px 16px' gap='5'>
            <Stack height='max-content'>
              <Text fontWeight={800} fontSize='16pt'>
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize='10pt' color='gray.400'>
                r/{communityData.id}
              </Text>
            </Stack>
            <Flex>
              <Button
                variant={isJoined ? "outline" : "solid"}
                h='30px'
                isLoading={loading}
                onClick={() => onLeaveOrJoinCommunity(communityData, isJoined)}
              >
                {isJoined ? "Joined" : "Join"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
export default Header
