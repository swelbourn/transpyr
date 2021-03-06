import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import { FormInput } from '../FormInput/FormInput.component';

class AddressAutocompleteInput extends React.Component {
  constructor(props) {
    super(props);

    this.autocomplete = null;
  }

  componentDidMount() {
    this.autocomplete = new this.props.google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      { fields: ['formatted_address', 'geometry'] }
    );
    //  this.geocoder = new this.props.google.maps.Geocoder();
    this.autocomplete.setFields(['address_component']);
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect = () => {
    let addressObject = this.autocomplete.getPlace();
    this.props.handleChange({
      target: { name: 'address', value: addressObject.formatted_address },
    });
    this.props.handleChange({
      target: {
        name: 'location',
        value: {
          type: 'Point',
          coordinates: [
            addressObject.geometry.location.lng(),
            addressObject.geometry.location.lat(),
          ],
        },
      },
    });
    //Set location valid only if real address has been selected from autocomplete
    this.props.handleChange({ target: { name: 'locationValid', value: true } });
  };

  render() {
    return (
      <FormInput
        name="address"
        type="text"
        id="autocomplete"
        onChange={(e) => {
          if (this.props.locationValid === true)
            //Set location invalid when manually typed
            this.props.handleChange({
              target: { name: 'locationValid', value: false },
            });
        }}
        defaultValue={this.props.address}
        disabled={this.props.disabled}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY,
})(AddressAutocompleteInput);
