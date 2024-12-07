import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { State, City, CinemaHall } from '../../types/movieTypes';

interface LocationSelectorProps {
  states: State[];
  selectedState: string;
  selectedCity: string;
  selectedCinemaHall: string;
  onStateChange: (stateId: string) => void;
  onCityChange: (cityId: string) => void;
  onCinemaHallChange: (cinemaHallId: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  states,
  selectedState,
  selectedCity,
  selectedCinemaHall,
  onStateChange,
  onCityChange,
  onCinemaHallChange,
}) => {
  const currentState = states.find((state) => state.id === selectedState);
  const cities = currentState?.cities || [];
  const currentCity = cities.find((city) => city.id === selectedCity);
  const cinemaHalls = currentCity?.cinemaHalls || [];

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
      <FormControl fullWidth>
        <InputLabel>State</InputLabel>
        <Select
          value={selectedState}
          label="State"
          onChange={(e) => onStateChange(e.target.value)}
        >
          {states.map((state) => (
            <MenuItem key={state.id} value={state.id}>
              {state.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>City</InputLabel>
        <Select
          value={selectedCity}
          label="City"
          onChange={(e) => onCityChange(e.target.value)}
          disabled={!selectedState}
        >
          {cities.map((city) => (
            <MenuItem key={city.id} value={city.id}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Cinema Hall</InputLabel>
        <Select
          value={selectedCinemaHall}
          label="Cinema Hall"
          onChange={(e) => onCinemaHallChange(e.target.value)}
          disabled={!selectedCity}
        >
          {cinemaHalls.map((hall) => (
            <MenuItem key={hall.id} value={hall.id}>
              {hall.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LocationSelector;
