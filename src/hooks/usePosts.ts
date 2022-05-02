import { useRecoilState } from "recoil"
import { PostState, postState } from "../atoms/postAtom"

const usePosts = () => {
  const [postStateValue, setPostStateValue] =
    useRecoilState<PostState>(postState)

  const onVote = async () => {}
  const onSelectPost = () => {}
  const onDeletePost = async () => {}

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  }
}

export default usePosts
