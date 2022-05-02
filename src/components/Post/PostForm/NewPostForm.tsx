import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Flex,
} from "@chakra-ui/react"
import React, { useRef, useState } from "react"
import { BsLink45Deg, BsMic } from "react-icons/bs"
import { BiPoll } from "react-icons/bi"
import { IoDocumentText, IoImageOutline } from "react-icons/io5"
import TabItem from "./TabItem"
import TextInputs from "./TextInputs"
import ImageUpload from "./ImageUpload"
import { Post } from "../../../atoms/postAtom"
import { useRouter } from "next/router"
import { User } from "firebase/auth"
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore"
import { firestore, storage } from "../../../firebase/clientApp"
import { getDownloadURL, ref, uploadString } from "firebase/storage"

type NewPostFormProps = {
  user: User
}

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
]

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState<string>("")
  const [textInput, setTextInput] = useState({
    title: "",
    body: "",
  })
  const router = useRouter()
  // Reference to hidden file inputs
  const selectFileRef = useRef<HTMLInputElement>(null)
  // Tab Index State
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  // Tab Change Handle Event
  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  // Handle Event For Creating a new Post
  const handleCreatePost = async () => {
    const { communityId } = router.query

    setLoading(true)

    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInput.title,
      body: textInput.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    }

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost)

      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`)
        await uploadString(imageRef, selectedFile, "data_url")
        const downloadUrl = await getDownloadURL(imageRef)

        await updateDoc(postDocRef, {
          imageUrl: downloadUrl,
        })
      }
    } catch (error) {
      console.log("Handle Create Post Error", error)
    }

    setLoading(false)
    router.push(`/r/${communityId}`)
  }

  // A function to store data url of files
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0])
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string)
      }
    }
  }

  // Text change Handle Event Function
  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    setTextInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Tabs bg='white' mt={4} index={tabIndex} onChange={handleTabsChange}>
      <TabList color='gray.500' borderBottom='1px solid'>
        {formTabs.map((item) => (
          <Tab flexGrow={1} p={0} key={item.title}>
            <TabItem item={item} />
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        <TabPanel>
          <TextInputs
            textInput={textInput}
            onTextChange={onTextChange}
            loading={loading}
            handleCreatePost={handleCreatePost}
          />
        </TabPanel>
        <TabPanel>
          <ImageUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            selectFileRef={selectFileRef}
            onSelectImage={onSelectImage}
            handleTabsChange={handleTabsChange}
          />
        </TabPanel>
        <TabPanel>
          <p>Link Feature comming soon</p>
        </TabPanel>
        <TabPanel>
          <p>Poll Feature comming soon</p>
        </TabPanel>
        <TabPanel>
          <p>Talk Feature comming soon</p>
        </TabPanel>
      </TabPanels>
      {/* <Flex justify='end' gap={4} m={4}>
        <Button variant='outline' h='30px'>
          Cancle
        </Button>
        <Button
          h='30px'
          disabled
          _disabled={{
            bg: "#ddd",
            cursor: "not-allowed",
          }}
        >
          Post
        </Button>
      </Flex> */}
    </Tabs>
  )
}
export default NewPostForm
