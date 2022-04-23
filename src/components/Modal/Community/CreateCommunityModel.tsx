import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Text,
  Box,
  Input,
  RadioGroup,
  Radio,
  Stack,
  Flex,
  Icon,
} from "@chakra-ui/react"
import React, { useState } from "react"

// Import React Icons
import { BsFillPersonFill, BsFillEyeFill } from "react-icons/bs"
import { HiLockClosed } from "react-icons/hi"

type createCommunityModelProps = {
  open: boolean
  handleClose: () => void
}

const CreateCommunityModel: React.FC<createCommunityModelProps> = ({
  open,
  handleClose,
}) => {
  // Community Type State
  const [communityType, setCommunityType] = useState("public")
  //   Community Name Input
  const [communityName, setCommunityName] = useState("")
  const [charsRemaining, setCharsRemaining] = useState(21)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return

    setCommunityName(event.target.value)
    setCharsRemaining(21 - event.target.value.length)
  }

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} isCentered size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='12pt'>Create a community</ModalHeader>
          <ModalCloseButton />
          <Divider w='90%' mx='auto' />
          <ModalBody display='flex' flexDirection='column' gap={2} mb={5}>
            <Box>
              <Text fontSize='12pt' fontWeight={700}>
                Name
              </Text>
              <Text color='gray.500' fontSize='9pt'>
                Community names including capitilization cannot be changed
              </Text>
            </Box>
            <Box>
              <Text
                position='relative'
                top='28px'
                left='10px'
                color='gray.400'
                width='20px'
              >
                r/
              </Text>
              <Input
                name='CommunityName'
                value={communityName}
                onChange={handleChange}
                pl='22px'
                position='relative'
                size='sm'
                borderRadius={4}
              />
              <Text
                fontSize='9pt'
                color={!charsRemaining ? "red.500" : "gray.400"}
              >
                {" "}
                {charsRemaining} Characters remaining{" "}
              </Text>
            </Box>
            <Box>
              <Text fontSize='12pt' fontWeight={600} mb={1}>
                Community Type
              </Text>
              <RadioGroup onChange={setCommunityType} value={communityType}>
                <Stack gap={1}>
                  <Radio value='public'>
                    <Flex gap='1' align='center'>
                      <Icon as={BsFillPersonFill} color='gray.500' />
                      <Text fontSize='10pt'>Public</Text>
                      <Text fontSize='8pt' color='gray.500'>
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Radio>
                  <Radio value='restricted'>
                    <Flex gap='1' align='center'>
                      <Icon as={BsFillEyeFill} color='gray.500' />
                      <Text fontSize='10pt'>Restricted</Text>
                      <Text fontSize='8pt' color='gray.500'>
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Radio>
                  <Radio value='private'>
                    <Flex gap='1' align='center'>
                      <Icon as={HiLockClosed} color='gray.500' />
                      <Text fontSize='10pt'>Private</Text>
                      <Text fontSize='8pt' color='gray.500'>
                        Only approved users can view and submit to this
                        community
                      </Text>
                    </Flex>
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </ModalBody>

          <ModalFooter bg='gray.100' borderRadius='0px 0px 10px 10px'>
            <Button variant='outline' h='30px' mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button h='30px' onClick={() => {}}>
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default CreateCommunityModel
