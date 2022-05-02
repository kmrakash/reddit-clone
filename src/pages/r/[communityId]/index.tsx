import { doc, getDoc } from "firebase/firestore"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import React from "react"
import { Community } from "../../../atoms/communityAtom"
import { auth, firestore } from "../../../firebase/clientApp"
import safeJsonStringify from "safe-json-stringify"
import CommunityNotFound from "../../../components/Community/CommunityNotFound"
import Header from "../../../components/Community/Header"
import PageContent from "../../../components/Layout/PageContent"
import CreatePostLink from "../../../components/Community/CreatePostLink"
import { useAuthState } from "react-firebase-hooks/auth"
import Posts from "../../../components/Post/Posts"

type CommunityPageProps = {
  communityData: Community
}

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  const [user] = useAuthState(auth)

  // Not Found Page
  if (!communityData) return <CommunityNotFound />

  return (
    <>
      <Head>
        <title> r/{communityData.id}</title>
        <meta
          name='description'
          content='Reddit Clone using Nextjs Chakra-Ui Firebase Typescript'
        />
        <link rel='icon' href='/images/redditFace.svg' />
      </Head>
      <Header communityData={communityData} />
      <PageContent>
        <>
          {user && <CreatePostLink />}
          <Posts communityData={communityData} />
        </>
        <>RHS children</>
      </PageContent>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      `communities`,
      context.query.communityId as string
    )

    const communityDoc = await getDoc(communityDocRef)

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({
                id: communityDoc.id,
                ...communityDoc.data(),
              })
            )
          : "",
      },
    }
  } catch (error) {
    console.error("[GET SERVERSIDE PROPS ERROR] -->", error)
    return {
      props: {
        communityData: "",
      },
    }
  }
}
export default CommunityPage
