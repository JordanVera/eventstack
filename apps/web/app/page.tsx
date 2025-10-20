"use client";

import { Button } from "@repo/ui";
import { UsersExample } from "../components/UsersExample";
import { EventsExample } from "../components/EventsExample";

import  "../styles/global.css";

export default function Web() {
  return (
    <div className="text-center">
      <h1 className="text-blue-500">Event Stack - tRPC Demo</h1>
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
