import React from "react";
import Banner from "./_components/Banner";
import AboutSection from "./_components/AboutSection";
import EventsList from "./_components/EventsList";
import StoriesCarousel from "./_components/StoriesCarousel";
import ExperienceForm from "./_components/ExperienceForm";

export const metadata = {
  title: "Pariah Design House | Experiential Art Bar Events",
  description: "Pariah Design House is a London-based experiential studio specialising in Art Bar pop-up events.",
};

const page = () => {
  return (
    <>
      <Banner />
      <AboutSection />
      <EventsList />
      <StoriesCarousel />
      <ExperienceForm />
    </>
  );
};

export default page;
