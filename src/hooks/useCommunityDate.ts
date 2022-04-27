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
