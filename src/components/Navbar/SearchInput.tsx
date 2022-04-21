/* eslint-disable react/no-children-prop */
import { SearchIcon } from "@chakra-ui/icons"
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import React from "react"

type SearchInputProps = {
  // user
}

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <Flex flexGrow={1} align='center' mx='2'>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          children={<SearchIcon color='gray.400' mb={1} />}
        />
        <Input
          type='text'
          placeholder='Search Reddit'
          h='34px'
          bg='gray.50'
          fontSize='10pt'
          _placeholder={{
            color: "gray.500",
          }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
        />
      </InputGroup>
    </Flex>
  )
}
export default SearchInput
