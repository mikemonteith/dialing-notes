import React from "react";
import styles from '@/styles/Layout.module.css'

export default function Layout({ children } : {children: React.ReactNode}) {
  return (
    <>
      <header className={styles.header}>
        <div className="container">
            <div className={styles.logo}>Dialing Notes</div>
        </div>
      </header>
      <main className={'container ' + styles.main}>{children}</main>
      <footer></footer>
    </>
  )
}
