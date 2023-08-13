import EventContent from "@/components/event-details/event-content";
import EventLogistics from "@/components/event-details/event-logistics";
import EventSummary from "@/components/event-details/event-summary";
import { getFeaturedEvents, getEventById } from "@/helpers/api-utils";

const EventDetailPage = (props) => {
  const event = props.event;

  if (!event) {
    return <p>Loading</p>;
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetailPage;

export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.eventId;
  const event = await getEventById(eventId);
  if (!event) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      event,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  return {
    paths: events.map((e) => ({
      params: {
        eventId: e.id,
      },
    })),
    fallback: true,
  };
}
