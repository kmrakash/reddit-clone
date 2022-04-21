import { ComponentStyleConfig } from "@chakra-ui/react"

export const Input: ComponentStyleConfig = {
  //   baseStyle: {
  //     field: {
  //       _hover: {
  //         bg: "red.500",
  //       },
  //       _focus: {
  //         bg: "gray.500",
  //       },
  //       _autofill: {
  //         border: "1px solid transparent",
  //         textFillColor: "#c6c6c6",
  //         boxShadow: "0 0 0px 1000px #232323 inset",
  //         transition: "background-color 5000s ease-in-out 0s",
  //       },
  //     },
  //   },

  //   variants: {
  //     simple: {
  //       bg: "green.500",
  //       _placeholder: {
  //         color: "red.500",
  //       },
  //     },
  //   },
  //   defaultProps: {
  //     variant: "simple",
  //   },

  variants: {
    backgroundFix: {
      field: {
        bg: "green.500",
        _placeholder: "red.500",
      },
    },
  },
  defaultProps: {
    variant: "backgroundFix",
  },
}
