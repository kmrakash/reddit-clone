import React from "react"
import PageContent from "../../../../components/Layout/PageContent"
import PostItem from "../../../../components/Post/PostItem"
import usePosts from "../../../../hooks/usePosts"

const PostPage: React.FC = () => {
  const { postStateValue, setPostStateValue, onDeletePost, onVote } = usePosts()

  return (
    <PageContent>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost}
            onDeletePost={onDeletePost}
            onVote={onVote}
            userIsCreator={false}
            userVoteValue={
              postStateValue.postVotes.find(
                (item) => item.postId === postStateValue.selectedPost.id
              )?.voteValue
            }
          />
        )}
      </>
      <>About Section</>
    </PageContent>
  )
}
export default PostPage
