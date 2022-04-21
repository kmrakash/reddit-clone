import { Input } from "@chakra-ui/react"
import React from "react"

type AuthInputProps = {
  name: "string"
  placeholder: "string"
  type: "string"
  onChange: () => void
  rest: object
}

const AuthInput: React.FC<AuthInputProps> = ({
  name,
  placeholder,
  type,
  onChange,
  rest,
}) => {
  return (
    <Input
      name={name}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      {...rest}
      _placeholder={{ color: "" }}
    />
  )
}
export default AuthInput
