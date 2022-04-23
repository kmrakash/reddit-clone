import React from "react"
import Navbar from "../Navbar"

const Layout: React.FC<any> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}
export default Layout
