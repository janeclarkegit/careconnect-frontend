import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from './Navbar'; 
import './events.css';

const Events = () => {
  // Default location set to London (useful fallback if geolocation fails)
  const [location, setLocation] = useState({ lat: 51.5074, lng: -0.1278 }); 
  const [events, setEvents] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Custom icon for event markers – a simple map pin to help users visually identify events
  const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
  });

  // This component allows the map to re-center smoothly when a new location is selected
  const UpdateMapCenter = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, 13);
    }, [center, map]);
    return null;
  };

  // This mock data simulates real events — helpful for testing and visualising functionality
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

  // This fetches coordinates based on the user's text input (using Nominatim API)
  const searchLocation = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
      );
      const data = await response.json();
      if (data.length > 0) {
        // Convert to float and update the map
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        const newCoords = { lat, lng };
        setLocation(newCoords);
        fetchEvents(lat, lng); // Load events near the searched area
      } else {
        alert('Location not found. Please try a different search.');
      }
    } catch (error) {
      console.error('Error searching location:', error);
      alert('There was a problem searching for that location.');
    }
  };

  // Use browser geolocation to find the user's current location on first load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };
          setUserLocation(newLocation);
          setLocation(newLocation);
          fetchEvents(latitude, longitude); // Load relevant events automatically
        },
        (error) => {
          // If user denies location or it fails, default to London with mock events
          console.error('Geolocation error:', error.message);
          fetchEvents(location.lat, location.lng); 
        }
      );
    } else {
      // Backup plan if browser doesn’t support geolocation
      console.warn('Geolocation not supported.');
      fetchEvents(location.lat, location.lng); 
    }
  }, []);

  return (
    <div className="events-page">
      {/* Persistent navbar */}
      <div className="navbar-container">
        <Navbar />
      </div>

      <div className="content-wrapper">
        <h1>Upcoming Events Near You</h1>

        {/* Search input and button to let users type in a town or city */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={searchLocation}>Search</button>
        </div>

        {/* Interactive Leaflet map with markers for each event */}
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

        {/* A simple card layout listing all nearby events */}
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

      {/* Simple footer to match the rest of the app */}
      <div className="footer-container">
        <footer className="home-footer">
          <p>&copy; 2025 CareConnect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Events;