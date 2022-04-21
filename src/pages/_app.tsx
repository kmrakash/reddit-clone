import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"

import { theme } from "../chakra/theme"
import Layout from "../components/Layout/Layout"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
