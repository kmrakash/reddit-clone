import { Button, Flex } from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import React from "react"

const CommunityNotFound: React.FC = () => {
  return (
    <>
      <Head>
        <title> NOT FOUND</title>
        <meta
          name='description'
          content='Reddit Clone using Nextjs Chakra-Ui Firebase Typescript'
        />
        <link rel='icon' href='/images/redditFace.svg' />
      </Head>
      <Flex
        direction='column'
        justify='center'
        align='center'
        minHeight='60vh'
        //   border='1px solid red'
        gap={2}
      >
        Sorry, that community does not exist or has been banned
        <Link href='/' passHref>
          <Button>
            <a>Go Home</a>
          </Button>
        </Link>
      </Flex>
    </>
  )
}
export default CommunityNotFound
