import { Box, Button, Divider, Flex, Icon, Stack, Text } from "@chakra-ui/react"
import React from "react"
import { Community } from "../../atoms/communityAtom"

import { BsThreeDots } from "react-icons/bs"
import { RiCakeLine } from "react-icons/ri"
import Link from "next/link"
import { useRouter } from "next/router"
import moment from "moment"

type AboutProps = {
  communityData: Community
}

const About: React.FC<AboutProps> = ({ communityData }) => {
  const router = useRouter()

  return (
    <Box position='sticky' top='14px'>
      <Flex
        justify='space-between'
        align='center'
        bg='blue.400'
        color='white'
        fontSize='10pt'
        fontWeight={700}
        p={2}
        borderRadius='4px 4px 0px 0px'
      >
        <Text>About Community</Text>
        <Icon as={BsThreeDots} />
      </Flex>

      <Stack bg='white' p={3} borderRadius='0px 0px 4px 4px'>
        <Flex fontSize='10pt' fontWeight={700}>
          <Flex direction='column' flexGrow={1}>
            <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
            <Text>Members</Text>
          </Flex>
          <Flex direction='column' flexGrow={1}>
            <Text>1</Text>
            <Text>Online</Text>
          </Flex>
        </Flex>
        <Divider />
        <Flex
          fontSize='10pt'
          w='100%'
          p={1}
          gap={2}
          align='center'
          fontWeight={500}
        >
          <Icon as={RiCakeLine} fontSize={18} />
          <Text>Created</Text>
          {communityData.createdAt && (
            <Text>
              {moment(new Date(communityData.createdAt.seconds * 1000)).format(
                "MMM DD, YYYY"
              )}
            </Text>
          )}
        </Flex>
        <Link href={`/r/${router.query.communityId}/submit`} passHref>
          <Button h='30px'>Create Post</Button>
        </Link>
      </Stack>
    </Box>
  )
}
export default About
