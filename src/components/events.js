import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from './Navbar'; 
import './events.css';

const Events = () => {
  const [location, setLocation] = useState({ lat: 51.5074, lng: -0.1278 }); // Default to London
  const [events, setEvents] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Custom map icon
  const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
  });

  // Component to update map center
  const UpdateMapCenter = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, 13);
    }, [center, map]);
    return null;
  };

  // Fetch events based on location
  const fetchEvents = (lat, lng) => {
    const eventData = [
      {
        id: 1,
        name: 'Young Carer Support Group',
        lat: lat + 0.01,
        lng: lng + 0.01,
        description: 'A safe space for young carers to connect and share experiences.',
        time: 'Monday, 2:00 PM',
      },
      {
        id: 2,
        name: 'Educational Workshop for Young Carers',
        lat: lat + 0.02,
        lng: lng + 0.02,
        description: 'Guidance and support for young carers to manage education.',
        time: 'Tuesday, 11:00 AM',
      },
      {
        id: 3,
        name: 'Mental Well-being Workshop',
        lat: lat + 0.03,
        lng: lng + 0.03,
        description: 'Techniques to manage stress and balance caregiving with school.',
        time: 'Thursday, 1:00 PM',
      },
    ];

    setEvents(eventData);
  };

  // Search and update map location
  const searchLocation = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
        fetchEvents(parseFloat(lat), parseFloat(lon));
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  // Get user location on page load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLocation({ lat: latitude, lng: longitude });
        fetchEvents(latitude, longitude);
      });
    }
  }, []);

  return (
    <div className="events-page">
      {/* Navbar wrapped in a container div */}
      <div className="navbar-container">
        <Navbar />
      </div>
      
      <div className="content-wrapper">
        <h1>Upcoming Events Near You</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={searchLocation}>Search</button>
        </div>

        <MapContainer center={location} zoom={13} style={{ height: '500px', width: '100%' }}>
          <UpdateMapCenter center={location} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {events.map((event) => (
            <Marker key={event.id} position={[event.lat, event.lng]} icon={customIcon}>
              <Popup>
                <b>{event.name}</b><br />
                {event.description}<br />
                <strong>Time:</strong> {event.time}
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <h2>Event Listings</h2>
        <div className="events-container">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p><strong>Time:</strong> {event.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer wrapped in a container div */}
      <div className="footer-container">
        <footer className="home-footer">
          <p>&copy; 2025 CareConnect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Events;