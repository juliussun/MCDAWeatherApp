import React, { useEffect, useState } from 'react';

// Debounce to create a function executing at intervals, prevent too many requests
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function useGetCities(searchString) {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      if (!searchString || searchString.length <= 3) {
        setCities([]); //clear cities if no input or input is too short
        return;
      }
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchString}&count=10&language=en&format=json`
        );
        const data = await response.json();
        setCities(data.results);
      } catch (error) {
        setError(error);
      }
    };

    const debouncedFetch = debounce(() => fetchCities(), 500); //1000 ms interval
    debouncedFetch();

  }, [searchString]);

  return {cities, error};
}
