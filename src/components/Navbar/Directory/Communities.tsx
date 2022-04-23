import { Flex, Icon, MenuItem } from "@chakra-ui/react"
import React, { useState } from "react"
import CreateCommunityModel from "../../Modal/Community/CreateCommunityModel"

// Import React Icons
import { GrAdd } from "react-icons/gr"

const Communities: React.FC = () => {
  // Community Toggle state
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Community create Model */}
      <CreateCommunityModel open={open} handleClose={() => setOpen(false)} />
      {/* List of Community Available */}
      <MenuItem onClick={() => setOpen(true)}>
        <Flex gap='1' align='center'>
          <Icon as={GrAdd} fontSize={20} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  )
}
export default Communities
