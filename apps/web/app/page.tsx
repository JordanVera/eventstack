"use client";

import { Button } from "@repo/ui";
import { UsersExample } from "../components/UsersExample";
import { EventsExample } from "../components/EventsExample";

import styles from "../styles/index.module.css";

export default function Web() {
  return (
    <div className={styles.container}>
      <h1>Event Stack - tRPC Demo</h1>
      <Button onClick={() => console.log("Pressed!")} text="Boop" />
      
      <div style={{ marginTop: '2rem' }}>
        <UsersExample />
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <EventsExample />
      </div>
    </div>
  );
}
