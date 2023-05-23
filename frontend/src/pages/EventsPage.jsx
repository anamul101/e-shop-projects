import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/Events/EventCard";

const EventsPage = () => {
//   const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
        <div>
          <Header activeHeading={4} />
          <EventCard active={true} />
        </div>
    </>
  );
};

export default EventsPage;