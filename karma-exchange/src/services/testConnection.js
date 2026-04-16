import axios from 'axios';

const testBackendConnection = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/');
    console.log('Backend connection successful:', response.data);
    return true;
  } catch (error) {
    console.log('Backend connection failed:', error.message);
    return false;
  }
};

export default testBackendConnection;