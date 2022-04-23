import { extendTheme } from "@chakra-ui/react"

// Import Fonts
import "@fontsource/open-sans/300.css"
import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/700.css"

//Import Components
import { Button } from "./button"
// import { Input } from "./inputs"

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF3c00",
    },
  },

  fonts: {
    body: "Open Sans, sans-serif",
  },

  // Apply global css
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
    }),
  },

  // Override Componentes to match custom design
  components: {
    Button,
  },
})
