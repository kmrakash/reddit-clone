import { Button, Flex, Stack, Image } from "@chakra-ui/react"
import React, { useRef } from "react"

type ImageUploadProps = {
  selectedFile?: string
  setSelectedFile: (value: string) => void
  selectFileRef: React.RefObject<HTMLInputElement>
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleTabsChange: (index: number) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  setSelectedFile,
  selectFileRef,
  onSelectImage,
  handleTabsChange,
}) => {
  return (
    <Stack justify='center' align='center'>
      {selectedFile ? (
        <>
          <Image
            src={selectedFile}
            alt='uploaded file'
            maxW='400px'
            maxH='400px'
          />

          <Flex gap={2}>
            <Button
              variant='outline'
              h='28px'
              onClick={() => setSelectedFile("")}
            >
              Remove
            </Button>
            <Button h='28px' onClick={() => handleTabsChange(0)}>
              Back To Post
            </Button>
          </Flex>
        </>
      ) : (
        <Flex
          minH='280px'
          w='100%'
          border='2px dashed'
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
            ref={selectFileRef}
            // value={selectedFile}
            onChange={onSelectImage}
          />
          <Button
            variant='outline'
            h='30px'
            onClick={() => selectFileRef.current?.click()}
          >
            Upload
          </Button>
        </Flex>
      )}
      {/* <Input
        placeholder='Title'
        fontSize='10pt'
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "#000",
        }}
      /> */}

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
