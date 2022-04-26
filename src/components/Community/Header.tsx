import { Box, Button, Flex, Icon, Stack, Text } from "@chakra-ui/react"
import React from "react"
import { FaReddit } from "react-icons/fa"
import { Community } from "../../atoms/communityAtom"

type HeaderProps = {
  // community data
  communityData: Community
}

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  return (
    <Flex direction='column' height='146px' width='100%'>
      <Box bg='blue.500' height='50%' />
      <Flex height='50%' justifyContent='center' bg='white'>
        <Flex width='95%' maxWidth='860px'>
          <Icon
            as={FaReddit}
            fontSize={64}
            position='relative'
            top={-3}
            color='blue.500'
            border='4px solid white'
            borderRadius='50%'
          />

          <Flex padding='10px 16px' gap='5'>
            <Stack height='max-content'>
              <Text fontWeight={800} fontSize='16pt'>
                {communityData.communityId}
              </Text>
              <Text fontWeight={600} fontSize='10pt' color='gray.400'>
                r/{communityData.communityId}
              </Text>
            </Stack>
            <Flex>
              <Button h='30px'>Joined</Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
export default Header
