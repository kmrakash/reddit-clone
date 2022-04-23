import React from "react"
import { AddIcon } from "@chakra-ui/icons"
import { Box, Flex, Icon } from "@chakra-ui/react"
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs"
import { GrAdd } from "react-icons/gr"
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5"

// const IconItem: React.FC = () => {
//     return (
//         <Flex>
//     )
// }

const Icons: React.FC = () => {
  return (
    <Flex>
      {/* DO not visible in small screens */}
      <Flex display={{ base: "none", md: "flex" }} gap={1.5}>
        <Flex p={2} cursor='pointer' _hover={{ bg: "gray.200" }}>
          <Icon as={BsArrowUpRightCircle} fontSize={20} />
        </Flex>
        <Flex p={2} cursor='pointer' _hover={{ bg: "gray.200" }}>
          <Icon as={IoFilterCircleOutline} fontSize={22} />
        </Flex>
        <Flex p={2} cursor='pointer' _hover={{ bg: "gray.200" }}>
          <Icon as={IoVideocamOutline} fontSize={22} />
        </Flex>
      </Flex>

      {/* Visible in All Screen Sizes */}
      <>
        <Flex p={2} cursor='pointer' _hover={{ bg: "gray.200" }}>
          <Icon as={BsChatDots} fontSize={20} />
        </Flex>
        <Flex p={2} cursor='pointer' _hover={{ bg: "gray.200" }}>
          <Icon as={IoNotificationsOutline} fontSize={20} />
        </Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          p={2}
          cursor='pointer'
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={GrAdd} fontSize={20} />
        </Flex>
      </>
    </Flex>
  )
}
export default Icons
