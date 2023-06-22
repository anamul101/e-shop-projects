import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ShowRoute from "../components/Sheard/ShowRoute";
const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <ShowRoute title="All events" first="Events"></ShowRoute>
          {
            allEvents.length !== 0 && (
              <EventCard active={true} data={allEvents && allEvents[0]} />
                      )
          }
          {
              allEvents?.length === 0 && (
                <div className="text-4xl bg-white text-red-500 py-40 flex justify-center items-center"> No Events have!</div>
              )
          }

        </div>
      )}
    </>
  );
};

export default EventsPage;