import { Stack } from "@chakra-ui/react"
import { collection, getDocs, query, where } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { Community } from "../../atoms/communityAtom"
import { Post } from "../../atoms/postAtom"
import { firestore } from "../../firebase/clientApp"
import usePosts from "../../hooks/usePosts"
import PostItem from "./PostItem"
import PostLoader from "./PostLoader"

type PostsProps = {
  communityData: Community
  userId?: string
}

const Posts: React.FC<PostsProps> = ({ communityData, userId }) => {
  const [loading, setLoading] = useState(false)
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  } = usePosts()
  // Fetch Community Post on component Mounts
  const getPosts = async () => {
    setLoading(true)
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id)
      )

      const postDocs = await getDocs(postQuery)

      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }))

      console.log("Posts", posts)
    } catch (error) {
      console.log("Posts Error", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack mt={4}>
          {postStateValue.posts.map((post) => {
            return (
              <PostItem
                key={post.id}
                post={post}
                onVote={onVote}
                onSelectPost={onSelectPost}
                onDeletePost={onDeletePost}
                userIsCreator={userId === post.creatorId}
                userVoteValue={0}
              />
            )
          })}
        </Stack>
      )}
    </>
  )
}
export default Posts
