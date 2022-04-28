import { Button, Flex, Input, Stack } from "@chakra-ui/react"
import React from "react"

type ImageUploadProps = {}

const ImageUpload: React.FC<ImageUploadProps> = () => {
  return (
    <Stack>
      <Input
        placeholder='Title'
        fontSize='10pt'
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "#000",
        }}
      />
      <Flex
        minH='280px'
        border='1px solid'
        borderColor='gray.200'
        justify='center'
        align='center'
        borderRadius={4}
      >
        <input
          id='file-upload'
          type='file'
          accept='image/x-png,image/gif,image/jpeg'
          hidden
        />
        <Button variant='outline' h='30px'>
          Upload
        </Button>
      </Flex>
      {/* <Flex justify='end' gap={4}>
        <Button variant='outline' h='30px'>
          Cancle
        </Button>
        <Button h='30px'>Post</Button>
      </Flex> */}
    </Stack>
  )
}
export default ImageUpload
