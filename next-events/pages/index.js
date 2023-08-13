import Head from "next/head";
import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/helpers/api-utils";

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta name="description" content="Content here" />
      </Head>
      <h1>The Home Page</h1>
      <EventList events={props.events} />
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  const events = await getFeaturedEvents();
  return {
    props: {
      events,
    },
    revalidate: 3600,
  };
}
