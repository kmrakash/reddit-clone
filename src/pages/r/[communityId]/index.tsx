import { doc, getDoc } from "firebase/firestore"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import React from "react"
import { Community } from "../../../atoms/communityAtom"
import { firestore } from "../../../firebase/clientApp"
import safeJsonStringify from "safe-json-stringify"
import CommunityNotFound from "../../../components/Community/CommunityNotFound"
import Header from "../../../components/Community/Header"

type CommunityPageProps = {
  communityData: Community
}

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  // Not Found Page
  if (!communityData) return <CommunityNotFound />

  return (
    <>
      <Head>
        <title> r/{communityData.communityId}</title>
        <meta
          name='description'
          content='Reddit Clone using Nextjs Chakra-Ui Firebase Typescript'
        />
        <link rel='icon' href='/images/redditFace.svg' />
      </Head>
      <Header communityData={communityData} />
      <h1> Welcome to {communityData.communityId} </h1>
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
                communityId: communityDoc.id,
                ...communityDoc.data(),
              })
            )
          : "",
      },
    }
  } catch (error) {
    console.error("[GET SERVERSIDE PROPS ERROR] -->", error)
  }
}
export default CommunityPage
