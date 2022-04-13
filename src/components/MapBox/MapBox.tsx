import React from 'react'
import styles from "./MapBox.module.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

interface propsType {
    latittude?: number;
    longitude?: number;
}

function MapBox({latittude, longitude}: propsType) {
    const mapContainer = React.useRef<HTMLDivElement>(null);
    const map = React.useRef<any>(null);
    const [lng, setLng] = React.useState(longitude||0);
    const [lat, setLat] = React.useState(latittude||0);
    const [zoom, setZoom] = React.useState(13);

    React.useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({//@ts-ignore
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
            accessToken: "pk.eyJ1IjoibWlsb3JkZnJvbnRlbmQiLCJhIjoiY2tzcmEzcHM3MGwxMzJ3dGg5YXF6bnpnYiJ9.0Q0LS4oCrACJJPRiJiakeg"
        });

        if (map.current) {
            var el = document.createElement('div');
            el.className = styles.marker;
            const marker1 = new mapboxgl.Marker({ element: el })
                .setLngLat([lng, lat])
                .addTo(map.current);
        }
    });

    return (
        <div className={styles.container}>
            <div ref={mapContainer} className={styles.map} />
        </div>
    )
}

export default MapBox
