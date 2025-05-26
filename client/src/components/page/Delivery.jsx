import MainContainer from "../util/MainContainer";
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import  'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue with Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export default function Delivery() {
    const storeAddress = "г. Минск, ул. Леонида Беды, 4к1"; // Using the address from Contact.jsx
    const storeCoordinates = [53.9319, 27.5957]; // Placeholder coordinates for Minsk (adjust if needed) - Leaflet expects [lat, lng]

    return (
        <MainContainer>
            <h1 className="text-center mb-4">Информация о доставке</h1>
        <div className="row">
            <div className="col-md-6 mb-4">
                <div className="card h-100">
                    <div className="card-body">
                        <h5 className="card-title">Адрес магазина</h5>
                        <p className="card-text">{storeAddress}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 mb-4">
                <div className="card h-100">
                    <div className="card-body">
                        <h5 className="card-title">Карта</h5>
                        <div style={{ height: "300px", width: "100%" }}>
                        <MapContainer 
                                center={storeCoordinates} 
                                zoom={15} 
                                style={{ height: "100%", width: "100%" }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={storeCoordinates}>
                                    <Popup>
                                        Наш магазин
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </MainContainer>
    );
} 