import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, StandaloneSearchBox } from '@react-google-maps/api';
import axios from 'axios';
import { Fab } from '@material-ui/core';
import Layout from '../components/layout/Layout'
import { isAuth } from '../components/auth/helpers'
import truck from '../icons/truck1.png';
import loc from '../icons/icon.png';

const Map = () => {

    const usuarios = [];

    const [currentPosition, setCurrentPosition] = useState({});

    const [markers, setMarkers] = useState([]);

    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        setCurrentPosition(currentPosition);

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/map`,
            data: {
                name: isAuth().email,
                location: {
                    lat: currentPosition.lat,
                    lng: currentPosition.lng
                }
            }
        })
    };

    useEffect(() => {
        //navigator.geolocation.getCurrentPosition(success);
        navigator.geolocation.watchPosition(success);
    }, [])

    const mapContainerStyle = {
        height: "100vh",
        width: "100vw",
    }

    const mapLoaded = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/map`,
        }).then(response => {
            response.data.map(item => usuarios.push(item))
            console.log('response', response.data);
        }).then(() => {
            setMarkers(usuarios);
            console.log(markers);
        })
    }

    useEffect(() => {
        if (markers.length !== 0) {
            console.log('useEffect de los makers', markers);
        }
    }, [markers]);

    const divStyle = {
        background: `white`,
        border: `1px solid #ccc`,
    }

    return (
        <React.Fragment>
            <LoadScript
                googleMapsApiKey="AIzaSyADRDBs8ljdIjGTWsvRZCxRTjTki2j_9bA"
                libraries={["places"]}
            >
                <GoogleMap
                    id="marker-example"
                    mapContainerStyle={mapContainerStyle}
                    zoom={15}
                    center={currentPosition}
                    onLoad={mapLoaded}
                    options={{
                        disableDefaultUI: true,
                    }}
                >
                    {<Marker icon={loc} position={currentPosition} />}
                    {markers.length !== 0 && (
                        markers.map(item => {
                            return (
                                <Marker key={item.name} icon={truck} style={{ width: '1px' }} position={item.location} >
                                    <InfoWindow
                                        position={item.location}
                                    >
                                        <div style={divStyle}>
                                            <h1>{item.name}</h1>
                                        </div>
                                    </InfoWindow>
                                </Marker>)
                        }))
                    }
                    <StandaloneSearchBox>
                        <input
                            type="text"
                            placeholder="Punto de partida"
                            style={{
                                boxSizing: `border-box`, border: `1px solid transparent`, width: `240px`, height: `32px`, padding: `0 12px`, borderRadius: `3px`, boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`, fontSize: `14px`, outline: `none`, textOverflow: `ellipses`, position: "absolute", left: "50%", marginLeft: "-120px", top: '10%'
                            }}
                        />
                    </StandaloneSearchBox>
                    <StandaloneSearchBox>
                        <input
                            type="text"
                            placeholder="Punto de llegada"
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "50%",
                                marginLeft: "-120px",
                                top: '15%'
                            }}
                        />
                    </StandaloneSearchBox>
                    <Layout />
                    <Fab color="secondary" aria-label="edit" style={{ background: '#ff0000', outline: 'none', position: 'absolute', right: '1%', bottom: '25vh', zIndex: '0' }}>
                        Pánico!
                    </Fab>
                </GoogleMap>
            </LoadScript>
        </React.Fragment>
    )
}

export default Map;
