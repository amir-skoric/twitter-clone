//imports
import SignIn from "./auth/pages/SignIn";
import SignUp from "./auth/pages/SignUp";
import LandingPage from "../components/pages/LandingPage";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AnonymousRoute from "./AnonymousRoute";

export default function App() {
  /* useEffect(() => {
    setSpinner(true);
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setSpinner(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getUsers();
  }, [toggle]);
*/
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <LandingPage />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<AnonymousRoute><SignUp /></AnonymousRoute>}></Route>
            <Route path="/signin" element={<AnonymousRoute><SignIn /></AnonymousRoute>}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}
