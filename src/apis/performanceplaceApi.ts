import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// 현재 위치를 백엔드로 전송 
export const sendLocation = async (latitude , longitude ) => {
  const dataToSend = {
        lat: latitude,
        lon: longitude,
    };
  try {
    const res = await axios.post(`${BASE_URL}api/currentlocation`,dataToSend)

    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}