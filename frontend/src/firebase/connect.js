import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig =
  JSON.parse(process.env.REACT_APP_FIRE_BASE_KEY || "") || {};

if (!process.env.REACT_APP_FIRE_BASE_KEY) {
  console.error("REACT_APP_FIRE_BASE_KEY not found");
} else {
}

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
