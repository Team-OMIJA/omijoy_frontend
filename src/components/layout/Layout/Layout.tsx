/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Outlet } from "react-router-dom"
import NavBar from "../NavBar/NavBar"

function Layout() {
  return (
    <>
    <NavBar />
    <main css={s.container}>
      <Outlet/>
    </main>
    </>
  )
}

export default Layout