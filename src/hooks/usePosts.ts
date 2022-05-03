import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { useRecoilState } from "recoil"
import { Post, PostState, postState } from "../atoms/postAtom"
import { firestore, storage } from "../firebase/clientApp"

const usePosts = () => {
  const [postStateValue, setPostStateValue] =
    useRecoilState<PostState>(postState)

  const onVote = async () => {}
  const onSelectPost = () => {}
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

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  }
}

export default usePosts
