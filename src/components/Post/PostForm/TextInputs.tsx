import { Button, Divider, Flex, Input, Stack, Textarea } from "@chakra-ui/react"
import React from "react"

type TextInputsProps = {
  textInput: {
    title?: string
    body?: string
  }
  loading: boolean
  onTextChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  handleCreatePost: () => void
}

const TextInputs: React.FC<TextInputsProps> = ({
  textInput,
  onTextChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={4}>
      <Input
        name='title'
        placeholder='Title'
        fontSize='10pt'
        value={textInput.title}
        onChange={onTextChange}
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "#000",
        }}
      />
      <Textarea
        name='body'
        placeholder='Text(optional)'
        value={textInput.body}
        onChange={onTextChange}
        fontSize='10pt'
        h='136px'
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "#000",
        }}
      />
      <Divider />
      <Flex justify='end' gap={4}>
        {/* <Button variant='outline' h='30px'>
          Cancle
        </Button> */}
        <Button
          h='30px'
          disabled={!textInput.title}
          isLoading={loading}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  )
}
export default TextInputs
