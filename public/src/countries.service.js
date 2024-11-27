//const COUNTRIES_API = `${BASE_API_URL}/countries`; // http://localhost:3000/api/countries

//const getCountries = () => _get(Countries_API);

const BASE_API_URL = 'http://localhost:3000/api';
const COUNTRIES_API = `${BASE_API_URL}/countries`;

const _get = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Ensure the token is included
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error;
  }
};

const getCountries = () => _get(COUNTRIES_API);

export { getCountries };

