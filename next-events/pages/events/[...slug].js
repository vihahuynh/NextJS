import EventList from "@/components/events/event-list";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";

const FilteredEventsPage = () => {
  const router = useRouter();
  const filter = router.query.slug;

  if (!filter) {
    return <p className="center">Loading...</p>;
  }

  const [filterYear, filterMonth] = filter;

  const numYear = +filterYear;
  const numMonth = +filterMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 1990 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return <p className="center">Invalid filter</p>;
  }

  const events = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (events?.length === 0) return <p>No events found</p>;

  return (
    <div>
      <EventList events={events} />
    </div>
  );
};

export default FilteredEventsPage;
