import GoogleMapReact from "google-map-react";
import * as apiUrl from "./../../constants/apiUrl";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
function Contact() {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  return (
    <div className="w-full h-full">
      {" "}
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiUrl.MAP_APP_API_URL }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
export default Contact;
