// import React from 'react';
// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// interface MapProps {
//   lat: number;
//   lng: number;
// }

// const GoogleMapComponent = withGoogleMap<MapProps>((props: MapProps) => (
//   <GoogleMap
//     defaultCenter={{ lat: props.lat, lng: props.lng }}
//     defaultZoom={8}
//   >
//     <Marker position={{ lat: props.lat, lng: props.lng }} />
//   </GoogleMap>
// ));

// const Map: React.FC<MapProps> = (props) => {
//   return (
//     <GoogleMapComponent
//       containerElement={<div style={{ height: `400px`, width: '500px' }} />}
//       mapElement={<div style={{ height: `100%` }} />}
//       lat={props.lat}
//       lng={props.lng}
//     />
//   );
// };

// export default Map;
