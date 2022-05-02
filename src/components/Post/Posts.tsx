import { collection, getDocs, query, where } from "firebase/firestore"
import React, { useEffect } from "react"
import { Community } from "../../atoms/communityAtom"
import { firestore } from "../../firebase/clientApp"

type PostsProps = {
  communityData: Community
}

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  // Fetch Community Post on component Mounts
  const getPosts = async () => {
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

      console.log("Posts", posts)
    } catch (error) {
      console.log("Posts Error", error)
    }
  }

  useEffect(() => {
    getPosts()
  })

  return <div>Posts</div>
}
export default Posts
