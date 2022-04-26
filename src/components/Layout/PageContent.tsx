import { Box, Flex } from "@chakra-ui/react"
import React from "react"

type pageContentProps = {
  children: React.ReactChild[]
}

const pageContent: React.FC<pageContentProps> = ({ children }) => {
  console.log("Children", children)
  return (
    <Flex justify='center' py='16px'>
      <Flex width='95%' justify='center' maxWidth='860px'>
        {/* Left Content */}
        <Flex
          direction='column'
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {children[0]}
        </Flex>
        {/* Right Content */}
        <Box
          display={{ base: "none", md: "flex" }}
          flexDirection='column'
          flexGrow={1}
        >
          {children[1]}
        </Box>
      </Flex>
    </Flex>
  )
}
export default pageContent
