import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore"
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
    setLoading(true)
    if (isJoined) {
      leaveCommunity(communityData.id)
      return
    }

    joinCommunity(communityData)
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

  const joinCommunity = async (communityData: Community) => {
    try {
      const batch = writeBatch(firestore)

      // create new Snippet
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      }

      // update user snippets with communityData (new Snippet)
      batch.set(
        doc(firestore, `users/${user?.uid}/communitySnippet`, communityData.id),
        newSnippet
      )
      // increament of Number of Member
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      })

      await batch.commit()

      // update recoil state - community mysnippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }))
    } catch (error: any) {
      console.log("Join Community Error", error)
      setError(error.message)
    }

    setLoading(false)
  }
  const leaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(firestore)

      // update user snippets with communityData (new Snippet)
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippet`, communityId)
      )
      // increament of Number of Member
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      })

      await batch.commit()

      // update recoil state - community mysnippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }))
    } catch (error: any) {
      console.log("leave community Error-->", error)
      setError(error.message)
    }
    setLoading(false)
  }

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
