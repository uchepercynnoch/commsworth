import React, { Component, Fragment } from "react";
import NavBar from "../components/NavBar";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import { loadLocations } from "../actions/load.locations.action";
import Marker from "../components/Marker";
import Title from "../components/Title";
class LocationsPage extends Component {
  static defaultProps = {
    center: {
      lat: 9.1452808, //Current Location
      lng: 7.3293903
    },
    zoom: 7
  };

  componentDidMount() {
    this.props.loadLocations();
  }

  render() {
    return (
      <Fragment>
        <NavBar />
        <div className="row">
          <div className="col-8 mx-auto col-md-6 col-sm-4 my-2">
            <Title text="Locations" />
          </div>
        </div>

        <div className="col-10 mx-auto col-md-8 col-sm-6 my-2">
          <div style={{ height: "70vh", width: "100%" }}>
            {this.props.loadingLocations ? (
              <div className="text-center">Loading map...</div>
            ) : (
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyBzF5wz7Y49T9W_mkDo0jYQrYcNZh9l9W0" //should be set in .env file in production
                }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
              >
                {/**Loop through the locations array and pass latitude and longitude as props to Marker component */}
                {this.props.locations !== null &&
                  this.props.locations.map(data => {
                    return (
                      <Marker
                        key={data.location}
                        text={data.location}
                        lat={data.latitude}
                        lng={data.longitude}
                      />
                    );
                  })}
              </GoogleMapReact>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  loadingLocations: state.loadLocationsReducer.loadingLocations,
  loadedLocations: state.loadLocationsReducer.loadedLocations,
  errorLoadingLocations: state.loadLocationsReducer.errorLoadingLocations,
  requestError: state.loadLocationsReducer.requestError,
  locations: state.loadLocationsReducer.locations,
  error: state.loadLocationsReducer.error
});
export default connect(mapStateToProps, { loadLocations })(LocationsPage);
