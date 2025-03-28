import React, { useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardImage,
  CCardTitle,
  CCardText,
  CCol,
  CRow,
} from '@coreui/react';

const Cards = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/evenements') 
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Erreur lors de la récupération des événements:', error))
  }, [])

  return (
    <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
      {events.map((event) => (
        <CCol key={event.id} xs>
          <CCard>
            <CCardImage orientation="top" src={event.image || '/placeholder.jpg'} />
            <CCardBody>
              <CCardTitle>{event.titre}</CCardTitle>
              <CCardText>{event.description}</CCardText>
            </CCardBody>
            <CCardFooter>
              <small className="text-body-secondary">
                {new Date(event.date).toLocaleDateString()}
              </small>
            </CCardFooter>
          </CCard>
        </CCol>
      ))}
    </CRow>
  );
};

export default Cards;
