import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRecoilState } from "recoil"
import {
  Community,
  CommunitySnippet,
  communityState,
} from "../atoms/communityAtom"
import { auth, firestore } from "../firebase/clientApp"

const useCommunityData = () => {
  const [user] = useAuthState(auth)
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const onLeaveOrJoinCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // check is user is authenticated

    if (isJoined) {
      leaveCommunity()
      return
    }

    joinCommunity()
  }

  // Fetch community Snippets of a user from firebase
  const getMySnippets = async () => {
    setLoading(true)
    try {
      const snippetsDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippet`)
      )
      const snippets = snippetsDocs.docs.map((doc) => ({ ...doc.data() }))

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, ...(snippets as CommunitySnippet[])],
      }))
    } catch (error: any) {
      console.log("Get My Snippets Error", error)
      setError(error.message)
    }
    setLoading(false)
  }

  const joinCommunity = () => {}
  const leaveCommunity = () => {}

  useEffect(() => {
    if (user) {
      getMySnippets()
    }
  }, [user])

  return {
    communityStateValue,
    onLeaveOrJoinCommunity,
    loading,
  }
}

export default useCommunityData
/**
 *  STEPS  -->
 *  1 . Access community RecoilState
 *  2 . Fetch Snippets on components mounts or user value change
 *  3 . On Logout Reset Community RecoilState
 *  4. Laoding and Error State
 *
 *  Functions :
 *
 *      getMySnippets
 *              fetch from communitySnippet and store in Community RecoilState
 *
 *      onJoinOrLeaveCommunity
 *          -   props : communityData , isJoined boolean
 *              - if user is not authenticatd pop up a modal
 *              else
 *                      if Joined leaveCommunity else joinCommunity
 *      joinCommunity
 *          batch writes
 *              - creating a new community snippet
 *              - updating the numberOfMembers
 *          update recoil state - community mysnippets
 *
 *      leaveCommunity
 *           // delete the community snippet from user
 *          // updating the numberOfMembers
 *          // update recoil state
 *
 *
 *      Note :
 *          isJoined : filter from communitySnippet Value if that community exists in that array
 */
