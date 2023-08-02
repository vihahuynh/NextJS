import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";

const AllEventsPage = () => {
  const router = useRouter();
  const onSearch = (year, month) => {
    router.push(`/events/${year}/${month}/abc`);
  };

  const events = getAllEvents();

  return (
    <div>
      <EventsSearch onSearch={onSearch} />
      <EventList events={events} />
    </div>
  );
};

export default AllEventsPage;
