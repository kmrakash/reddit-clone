import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { authModalState } from "../atoms/authModalAtom"
import { communityState } from "../atoms/communityAtom"
import { Post, PostState, postState, PostVote } from "../atoms/postAtom"
import { auth, firestore, storage } from "../firebase/clientApp"

const usePosts = () => {
  const [postStateValue, setPostStateValue] =
    useRecoilState<PostState>(postState)
  const [user] = useAuthState(auth)
  const communityStateValue = useRecoilValue(communityState)
  const setAuthModalState = useSetRecoilState(authModalState)
  const router = useRouter()

  // Voting Feature
  const onVote = async (post: Post, vote: 1 | -1) => {
    const { communityId } = post

    // if user is not authenticated open modal for them
    if (!user) {
      setAuthModalState((prev) => ({
        ...prev,
        view: "login",
        open: true,
      }))
      return
    }

    try {
      // grab voteStatus
      const { voteStatus } = post
      // check if postVote exist meaning is user has already voted for that post
      const existingPostVote = postStateValue.postVotes.find(
        (postVote) => postVote.postId === post.id
      )

      const batch = writeBatch(firestore)

      // implement batch write to firebase since it includes write operation to two documents of firebase
      // grab all postObject to apply mutate feature ( always make changes in copied objects and swap updated )
      // create a voteChange variable to make changes according to condition
      const updatedPost = { ...post }
      const updatedPostArray = [...postStateValue.posts]
      let updatedPostVoteArray = [...postStateValue.postVotes]
      let voteChange: number = vote

      if (!existingPostVote) {
        const postVoteCollectionRef = doc(
          collection(firestore, "users", `${user?.uid}/postVotes`)
        )

        const newPostVote: PostVote = {
          id: postVoteCollectionRef.id,
          postId: post.id!,
          communityId,
          voteValue: vote,
        }

        batch.set(postVoteCollectionRef, newPostVote)

        updatedPost.voteStatus = voteStatus + vote
        updatedPostVoteArray = [...updatedPostVoteArray, newPostVote]
      } else {
        // flipping vote status
        //  Reference to postVoteRef in firebase store
        const postVoteDocRef = doc(
          firestore,
          "users",
          `${user?.uid}/postVotes/${existingPostVote.id}`
        )

        if (existingPostVote.voteValue === vote) {
          voteChange *= -1
          updatedPost.voteStatus = voteStatus - vote
          updatedPostVoteArray = updatedPostVoteArray.filter(
            (item) => item.id !== existingPostVote.id
          )
          batch.delete(postVoteDocRef)
        } else {
          voteChange = 2 * vote
          updatedPost.voteStatus = voteStatus + 2 * vote

          const voteIdx = postStateValue.postVotes.findIndex(
            (item) => item.id === existingPostVote.id
          )

          if (voteIdx !== -1) {
            updatedPostVoteArray[voteIdx] = {
              ...existingPostVote,
              voteValue: vote,
            }
          }

          batch.update(postVoteDocRef, {
            voteValue: vote,
          })
        }
      }

      const postRef = doc(firestore, "posts", post.id!)

      batch.update(postRef, {
        voteStatus: voteStatus + voteChange,
      })

      await batch.commit()

      const postIdx = postStateValue.posts.findIndex(
        (item) => item.id === post.id
      )

      if (postIdx !== -1) {
        updatedPostArray[postIdx] = {
          ...updatedPost,
          voteStatus: voteStatus + voteChange,
        }
      }

      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPostArray,
        postVotes: updatedPostVoteArray,
      }))
    } catch (error) {
      console.log("on Vote Error -->", error)
    }
  }

  const onSelectPost = (post: Post) => {
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: post,
    }))
    router.push(`/r/${post.communityId}/comments/${post.id}`)
  }

  const onDeletePost = async (post: Post) => {
    try {
      // check if image, delete if exists
      if (post.imageUrl) {
        const imageRef = ref(storage, `posts/${post.id}/image`)
        await deleteObject(imageRef)
      }
      // delete post document
      const postDocRef = doc(firestore, "posts", post.id!)
      await deleteDoc(postDocRef)

      // update recoil state
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }))

      return true
    } catch (error: any) {
      console.log("OnDeletePost Error", error.message)
    }

    return false
  }

  const getCommunityPostVotes = async (communityId: string) => {
    const postVoteQuery = query(
      collection(firestore, `users/${user?.uid}/postVotes`),
      where("communityId", "==", communityId)
    )

    const postVotesDocs = await getDocs(postVoteQuery)
    const postVotes = postVotesDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    setPostStateValue((prev) => ({
      ...prev,
      postVotes: postVotes as PostVote[],
    }))
  }

  // onMount grab postVote data
  useEffect(() => {
    if (!user || !communityStateValue.currentCommunity) return

    getCommunityPostVotes(communityStateValue.currentCommunity.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, communityStateValue.currentCommunity])

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  }
}

export default usePosts
