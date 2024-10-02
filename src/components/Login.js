import React, { useState } from 'react';
import axios from 'axios';

const GeoLocation = () => {
    const [ipAddress, setIpAddress] = useState('');
    const [geoInfo, setGeoInfo] = useState(null);
    const [error, setError] = useState(null);

    const fetchGeoInfo = async () => {
        setError(null);
        try {
            const response = await axios.post('http://localhost/api/geolocation', { ip_address: ipAddress });
            setGeoInfo(response.data);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error);
            } else {
                setError('Network error. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h2>IP Geolocation</h2>
            <input
                type="text"
                placeholder="Enter IP address"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
            />
            <button onClick={fetchGeoInfo}>Get Geo Info</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {geoInfo && (
                <div>
                    <h3>Geolocation Information:</h3>
                    <p>IP: {geoInfo.ip}</p>
                    <p>City: {geoInfo.city}</p>
                    <p>Region: {geoInfo.region}</p>
                    <p>Country: {geoInfo.country}</p>
                    <p>Location: {geoInfo.loc}</p>
                    <p>Organization: {geoInfo.org}</p>
                </div>
            )}
        </div>
    );
};

export default GeoLocation;