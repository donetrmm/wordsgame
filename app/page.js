"use client";
import Head from "next/head";
import Game from "@/app/components/Game.js";
import styles from "@/app/main.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Word Guessing Game</title>
        <meta name="description" content="Word Guessing Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.sectionMain}>
        <Game />
      </section>
    </div>
  );
}
