import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Flex,
} from "@chakra-ui/react"
import React from "react"
import { BsLink45Deg, BsMic } from "react-icons/bs"
import { BiPoll } from "react-icons/bi"
import { IoDocumentText, IoImageOutline } from "react-icons/io5"
import TabItem from "./TabItem"
import TextInputs from "./TextInputs"
import ImageUpload from "./ImageUpload"

type NewPostFormProps = {}

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

const NewPostForm: React.FC<NewPostFormProps> = () => {
  return (
    <Tabs bg='white' mt={4}>
      <TabList color='gray.500' borderBottom='1px solid'>
        {formTabs.map((item) => (
          <Tab flexGrow={1} p={0} key={item.title}>
            <TabItem item={item} />
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        <TabPanel>
          <TextInputs />
        </TabPanel>
        <TabPanel>
          <ImageUpload />
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
      <Flex justify='end' gap={4} m={4}>
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
      </Flex>
    </Tabs>
  )
}
export default NewPostForm
