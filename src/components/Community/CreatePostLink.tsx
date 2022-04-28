import { Flex, Icon, Image, Input } from "@chakra-ui/react"
import React from "react"
import { FaReddit } from "react-icons/fa"
import { IoImageOutline } from "react-icons/io5"

import { BsLink45Deg } from "react-icons/bs"
import { useRouter } from "next/router"

const CreatePostLink: React.FC = () => {
  const router = useRouter()
  const handleClick = () => {
    const { communityId } = router.query
    if (communityId) {
      router.push(`/r/${communityId}/submit`)
      return
    }
  }

  return (
    <Flex
      border='1px solid'
      borderColor='gray.300'
      bg='white'
      p={2}
      h='56px'
      borderRadius={4}
      justify='space-evenly'
      align='center'
      gap={4}
    >
      {/* image */}
      <Icon as={FaReddit} fontSize={36} color='gray.300' />
      {/* input */}
      <Input
        placeholder='Create Post'
        fontSize='10pt'
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg='gray.50'
        borderColor='gray.200'
        height='36px'
        borderRadius={4}
        onClick={handleClick}
      />
      {/* photo */}
      <Icon as={IoImageOutline} fontSize={24} color='gray.400' />
      {/* link */}
      <Icon as={BsLink45Deg} fontSize={24} color='gray.400' />
    </Flex>
  )
}
export default CreatePostLink
