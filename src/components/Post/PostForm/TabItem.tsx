import { Flex, Icon, Text } from "@chakra-ui/react"
import React from "react"

export interface TabItem {
  icon: typeof Icon.arguments
  title: string
}

type TabItemProps = {
  item: TabItem
}

const TabItem: React.FC<TabItemProps> = ({ item }) => {
  return (
    <Flex
      justify='center'
      align='center'
      flexGrow={1}
      cursor='pointer'
      w='100%'
      //   border='1px solid red'
      p='14px 0'
      gap={2}
      fontWeight={700}
      borderRightColor='gray.200'
      _hover={{ bg: "gray.50" }}
    >
      <Flex align='center' h='20px'>
        <Icon as={item.icon} h='100%' fontSize={18} />
      </Flex>
      <Text fontSize='10pt'> {item.title}</Text>
    </Flex>
  )
}
export default TabItem
