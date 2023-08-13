import { getFilteredEvents } from "@/helpers/api-utils";
import EventList from "@/components/events/event-list";

const FilteredEventsPage = (props) => {
  if (props.events?.length === 0) return <p>No events found</p>;
  return <EventList events={props.filterEvents} />;
};

export default FilteredEventsPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const [filterYear, filterMonth] = params.slug;

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
    return {
      notFound: true,
    };
  }
  const filterEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return { props: { filterEvents, year: numYear, month: numMonth } };
}
