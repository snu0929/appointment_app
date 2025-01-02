import { useState } from "react";
import { UserForm } from "./components/UserForm";
import { Booking } from "./components/Booking";

function App() {
  const [userId, setUserId] = useState("");
  return (
    <div>
      {!userId ? (
        <UserForm setUserId={setUserId} />
      ) : (
        <Booking userId={userId} />
      )}
    </div>
  );
}

export default App;
