import { Button, Divider, Flex, Input, Stack, Textarea } from "@chakra-ui/react"
import React from "react"

type TextInputsProps = {}

const TextInputs: React.FC<TextInputsProps> = () => {
  return (
    <Stack spacing={4}>
      <Input
        placeholder='Title'
        fontSize='10pt'
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "#000",
        }}
      />
      <Textarea
        placeholder='Text(optional)'
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
        <Button variant='outline' h='30px'>
          Cancle
        </Button>
        <Button h='30px'>Post</Button>
      </Flex>
    </Stack>
  )
}
export default TextInputs
