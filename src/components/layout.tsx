import React from "react";
import styles from '@/styles/Layout.module.css'
import Header from "./header";

export default function Layout({ children } : {children: React.ReactNode}) {
  return (
    <>
      <Header />
      <main className={'container ' + styles.main}>{children}</main>
      <footer></footer>
    </>
  )
}
