import React, { useState } from "react"
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
import {
  Flex,
  Icon,
  Stack,
  Text,
  Image,
  Skeleton,
  Spinner,
} from "@chakra-ui/react"
import moment from "moment"
import { useRecoilValue } from "recoil"
import { communityState } from "../../atoms/communityAtom"
import { useRouter } from "next/router"

type PostItemProps = {
  post: Post
  onVote: (
    event: React.MouseEvent<SVGElement | MouseEvent>,
    post: Post,
    vote: 1 | -1
  ) => {}
  onSelectPost?: (post: Post) => void
  onDeletePost: (post: Post) => Promise<boolean>
  userVoteValue: 1 | undefined | -1
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
  const [loadingImage, setLoadingImage] = useState(true)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const communityStateValue = useRecoilValue(communityState)
  const router = useRouter()
  // A condition to check if component is in singlePage Post
  const singlePage = !onSelectPost

  // Delete async Event Handler
  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement | MouseEvent>
  ) => {
    event.stopPropagation()
    setLoadingDelete(true)
    try {
      const success = await onDeletePost(post)

      if (!success) {
        throw new Error("Post could not delete")
      }
      console.log("Post has been deleted successfully")
      if (singlePage) {
        router.push(`/r/${post.communityId}`)
      }
    } catch (error) {
      console.log("HandleDelete Error", error)
    }

    setLoadingDelete(false)
  }

  return (
    <Flex
      bg='white'
      border='1px solid'
      borderRadius={singlePage ? "4px 4px 0px 0px" : "4px"}
      borderColor={singlePage ? "white" : "gray.300"}
      _hover={{
        borderColor: singlePage ? "none" : "gray.500",
      }}
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      <Flex
        direction='column'
        bg={singlePage ? "white" : "gray.200"}
        borderRadius={singlePage ? "0" : "3px 0px 0px 3px"}
        w='48px'
        color='gray.500'
        // justify='center'
        py={2}
        align='center'
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          cursor='pointer'
          fontSize={22}
          onClick={(event) => onVote(event, post, 1)}
        />
        <Text>{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          cursor='pointer'
          fontSize={22}
          onClick={(event) => onVote(event, post, -1)}
        />
      </Flex>
      <Stack p={2} w='100%'>
        <Flex fontSize='9pt' gap='1'>
          {/* Icon */}
          {communityStateValue.currentCommunity?.imageURL ? (
            <>
              <Image
                src={communityStateValue.currentCommunity?.imageURL}
                alt=' community logo '
                w='20px'
              />
            </>
          ) : (
            <Icon as={FaReddit} fontSize={18} color='blue.500' />
          )}
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
            {loadingImage && <Skeleton h='200px' w='100%' borderRadius={4} />}
            <Image
              src={post.imageUrl}
              alt='post Image'
              maxH='480px'
              display={loadingImage ? "none" : "unset"}
              onLoad={() => setLoadingImage(false)}
            />
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
              onClick={(event) => handleDelete(event)}
            >
              {loadingDelete ? (
                <>
                  <Spinner size='sm' />
                </>
              ) : (
                <>
                  <Icon as={AiOutlineDelete} />
                  <Text>Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Stack>
    </Flex>
  )
}
export default PostItem
