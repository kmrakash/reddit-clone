import React from "react"
import { Post } from "../../atoms/postAtom"

// React Icons
import { AiOutlineDelete } from "react-icons/ai"
import { BsChat, BsDot } from "react-icons/bs"
import { FaReddit } from "react-icons/fa"
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5"
import { Flex, Icon, Stack, Text, Image } from "@chakra-ui/react"
import moment from "moment"

type PostItemProps = {
  post: Post
  onVote: () => {}
  onSelectPost: () => void
  onDeletePost: () => {}
  userVoteValue: 1 | 0 | -1
  userIsCreator: boolean
}

const PostItem: React.FC<PostItemProps> = ({
  post,
  onVote,
  onDeletePost,
  onSelectPost,
  userIsCreator,
  userVoteValue,
}) => {
  return (
    <Flex
      bg='white'
      border='1px solid'
      borderRadius={4}
      borderColor='gray.300'
      _hover={{
        borderColor: "black",
      }}
    >
      <Flex
        direction='column'
        bg='gray.200'
        w='48px'
        color='gray.500'
        // justify='center'
        py={2}
        align='center'
      >
        <Icon as={IoArrowUpCircleOutline} fontSize={22} />
        <Text>{post.voteStatus}</Text>
        <Icon as={IoArrowDownCircleOutline} fontSize={22} />
      </Flex>
      <Stack p={2} w='100%'>
        <Flex fontSize='9pt' gap='1'>
          {/* Icon */}
          <Icon as={FaReddit} fontSize={18} color='blue.500' />
          <Text>
            <strong>r/{post.communityId}</strong>
          </Text>
          <Flex justify='center' align='center'>
            <Icon as={BsDot} color='gray.500' />
          </Flex>
          <Text color='gray.500'>
            Posted by u/
            {post.creatorDisplayName}{" "}
            {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
          </Text>
        </Flex>
        <Text fontWeight={700}>{post.title}</Text>
        <Text>{post.body}</Text>
        {post.imageUrl && (
          <Flex justify='center' align='center'>
            <Image src={post.imageUrl} alt='post Image' maxH='480px' />
          </Flex>
        )}
        <Flex fontSize='10pt' color='gray.500' fontWeight={600}>
          <Flex
            justify='center'
            align='center'
            gap='1'
            borderRadius={4}
            p='8px 10px'
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={BsChat} />
            <Text>Comment</Text>
          </Flex>
          <Flex
            justify='center'
            align='center'
            gap='1'
            borderRadius={4}
            p='8px 10px'
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={IoArrowRedoOutline} />
            <Text>Share</Text>
          </Flex>
          <Flex
            justify='center'
            align='center'
            gap='1'
            borderRadius={4}
            p='8px 10px'
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={IoBookmarkOutline} />
            <Text>Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              justify='center'
              align='center'
              gap='1'
              borderRadius={4}
              p='8px 10px'
              _hover={{ bg: "gray.200" }}
            >
              <Icon as={AiOutlineDelete} />
              <Text>Delete</Text>
            </Flex>
          )}
        </Flex>
      </Stack>
    </Flex>
  )
}
export default PostItem
