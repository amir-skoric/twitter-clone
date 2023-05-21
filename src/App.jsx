//imports
import Router from "./router/Router";
// eslint-disable-next-line no-unused-vars
import React from "react";

export default function App() {
  /* useEffect(() => {
    setSpinner(true);
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setSpinner(false);
    };
    getUsers();
  }, [toggle]);
*/
  return (
    <>
      <Router />
    </>
  );
}
