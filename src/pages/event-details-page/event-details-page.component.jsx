import React from 'react';

import { calculateEventInfo } from '../../libs/calculateEventInfo';
import { handleHTTPError } from '../../libs/handleHTTPError';

import ErrorPage from '../error-page/error-page.component';
import { EventDetails } from '../../components/EventDetails/EventDetails.component';
import { LoadingResource } from '../../components/LoadingResource/LoadingResource.component';

import Container from 'react-bootstrap/Container';

import './event-details-page.styles.scss';

class EventDetailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventId: this.props.match.params.id,
      event: {},
      error: null,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/events/${this.state.eventId}`)
      .then((response) => response.json())
      .then((response) => handleHTTPError(response))
      .then((data) => {
        return calculateEventInfo(data.data.data);
      })
      .then((eventData) => {
        console.log(eventData);
        this.setState({
          event: {
            ...eventData,
          },
        });
      })
      .catch((err) => {
        this.setState({
          error: {
            ...err,
          },
        });
      });
  }

  renderEvent() {
    const { event } = this.state;
    return Object.keys(event).length ? (
      <EventDetails {...event} />
    ) : (
      <LoadingResource resource="event" />
    );
  }

  render() {
    const { error } = this.state;
    const eventDisplay = this.renderEvent();
    return (
      <Container as="main" className="event-details-page" fluid>
        {!error ? eventDisplay : <ErrorPage {...error} />}
      </Container>
    );
  }
}

export default EventDetailsPage;
