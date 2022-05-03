import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react"
import React, { useRef, useState } from "react"
import { Community } from "../../atoms/communityAtom"

import { BsThreeDots } from "react-icons/bs"
import { RiCakeLine } from "react-icons/ri"
import { FaReddit } from "react-icons/fa"
import Link from "next/link"
import { useRouter } from "next/router"
import moment from "moment"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, firestore, storage } from "../../firebase/clientApp"
import useSelectFile from "../../hooks/useSelectFile"
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage"
import { doc, updateDoc } from "firebase/firestore"
import { useSetRecoilState } from "recoil"
import { communityState } from "../../atoms/communityAtom"

type AboutProps = {
  communityData: Community
}

const About: React.FC<AboutProps> = ({ communityData }) => {
  const selectedFileRef = useRef<HTMLInputElement>(null)
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile()
  const [uploadImageLoading, setUploadImageLoading] = useState(false)
  const setCommunitiesStateValue = useSetRecoilState(communityState)

  const router = useRouter()
  const [user] = useAuthState(auth)

  const onUpdateLogo = async () => {
    if (!selectedFile) return

    setUploadImageLoading(true)
    try {
      if (communityData.imageURL) {
        const delLogoRef = ref(storage, `communities/${communityData.id}/image`)
        await deleteObject(delLogoRef)
      }

      const logoRef = ref(storage, `communities/${communityData.id}/image`)
      await uploadString(logoRef, selectedFile, "data_url")

      const downloadUrl = await getDownloadURL(logoRef)

      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadUrl,
      })

      setCommunitiesStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadUrl,
        } as Community,
      }))

      setSelectedFile("")
    } catch (error) {
      console.log("UploadLogo Error ", error)
    }
    setUploadImageLoading(false)
  }

  return (
    <Box position='sticky' top='14px'>
      <Flex
        justify='space-between'
        align='center'
        bg='blue.400'
        color='white'
        fontSize='10pt'
        fontWeight={700}
        p={2}
        borderRadius='4px 4px 0px 0px'
      >
        <Text>About Community</Text>
        <Icon as={BsThreeDots} />
      </Flex>

      <Stack bg='white' p={3} borderRadius='0px 0px 4px 4px'>
        <Flex fontSize='10pt' fontWeight={700}>
          <Flex direction='column' flexGrow={1}>
            <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
            <Text>Members</Text>
          </Flex>
          <Flex direction='column' flexGrow={1}>
            <Text>1</Text>
            <Text>Online</Text>
          </Flex>
        </Flex>
        <Divider />
        <Flex
          fontSize='10pt'
          w='100%'
          p={1}
          gap={2}
          align='center'
          fontWeight={500}
        >
          <Icon as={RiCakeLine} fontSize={18} />
          <Text>Created</Text>
          {communityData.createdAt && (
            <Text>
              {moment(new Date(communityData.createdAt.seconds * 1000)).format(
                "MMM DD, YYYY"
              )}
            </Text>
          )}
        </Flex>
        <Link href={`/r/${router.query.communityId}/submit`} passHref>
          <Button h='30px'>Create Post</Button>
        </Link>
        {user?.uid === communityData.creatorId && (
          <>
            <Divider />
            <Stack fontSize='10pt' spacing={1}>
              <Text fontWeight={700}>Admin</Text>
              <Flex justify='space-between'>
                <input
                  type='file'
                  hidden
                  accept='image/x-png,image/gif,image/jpeg'
                  ref={selectedFileRef}
                  onChange={onSelectFile}
                />
                <Button
                  variant='link'
                  color='blue.500'
                  onClick={() => selectedFileRef.current?.click()}
                >
                  change image
                </Button>
                {selectedFile || communityData.imageURL ? (
                  <Image
                    src={selectedFile || communityData.imageURL}
                    alt='community logo'
                    boxSize='40px'
                    borderRadius='full'
                  />
                ) : (
                  <Icon as={FaReddit} fontSize={40} color='brand.100' />
                )}
              </Flex>
              {selectedFile && (
                <Flex justify='center'>
                  <Button
                    variant='outline'
                    h='24px'
                    w='50%'
                    isLoading={uploadImageLoading}
                    onClick={onUpdateLogo}
                  >
                    Save Changes
                  </Button>
                </Flex>
              )}
            </Stack>
          </>
        )}
      </Stack>
    </Box>
  )
}
export default About
