import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  AuthenticationPage,
  ChatsPage,
  NotFoundPage,
  ProfilePage,
} from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
        <Route path="/chats" element={<ChatsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
