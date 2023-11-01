// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/actions/Header";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./fbase/firebase";
import RoutesComponent from "./components/routes/routes";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const loggedIn = false; 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    }); 

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Header auth={auth} loggedIn={loggedIn} user={user} />
      <RoutesComponent user={user} auth={auth} />
    </Router>
  );
}

export default App;
