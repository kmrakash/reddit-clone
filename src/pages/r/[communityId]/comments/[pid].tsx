import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Post } from "../../../../atoms/postAtom"
import About from "../../../../components/Community/About"
import PageContent from "../../../../components/Layout/PageContent"
import PostItem from "../../../../components/Post/PostItem"
import { auth, firestore } from "../../../../firebase/clientApp"
import useCommunityData from "../../../../hooks/useCommunityData"
import usePosts from "../../../../hooks/usePosts"

const PostPage: React.FC = () => {
  const { postStateValue, setPostStateValue, onDeletePost, onVote } = usePosts()
  const { communityStateValue } = useCommunityData()
  const [user] = useAuthState(auth)
  const router = useRouter()

  // fetch post on refresh or access through direct link
  const fetchPost = async (postId: string) => {
    try {
      const postDocRef = doc(firestore, "posts", postId)
      const postDoc = await getDoc(postDocRef)
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: {
          id: postDoc.id,
          ...postDoc.data(),
        } as Post,
      }))
    } catch (error) {
      console.log("fetchPost error", error)
    }
  }

  useEffect(() => {
    const { pid } = router.query

    if (pid && !postStateValue.selectedPost) {
      fetchPost(pid as string)
    }
  }, [router.query, postStateValue.selectedPost])

  return (
    <PageContent>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost}
            onDeletePost={onDeletePost}
            onVote={onVote}
            userIsCreator={user?.uid === postStateValue.selectedPost.creatorId}
            userVoteValue={
              postStateValue.postVotes.find(
                (item) => item.postId === postStateValue.selectedPost?.id
              )?.voteValue
            }
          />
        )}
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  )
}
export default PostPage
