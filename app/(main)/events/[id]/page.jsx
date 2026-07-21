import React from "react";
import EventDetailPageClient from "./EventDetailPageClient";

export async function generateMetadata({ params }) {
  const { id: slug } = params;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://admin.pariahdesignhouse.com/api/v1";
    const res = await fetch(`${baseUrl}/events/${slug}`);
    const result = await res.json();
    const event = result?.data;
    
    return {
      title: event?.title ? `${event.title} | Pariah Design House` : "Event Details | Pariah Design House",
      description: event?.description || "Discover experiential Art Bar pop-up events by Pariah Design House.",
    };
  } catch (err) {
    return {
      title: "Event Details | Pariah Design House",
    };
  }
}

export default function Page({ params }) {
  return <EventDetailPageClient params={params} />;
}
