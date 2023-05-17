//imports
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";

import Profile from "../pages/Profile";
import Frontpage from "../pages/Frontpage";

import { AuthProvider } from "../contexts/AuthContext";
import {
  BrowserRouter as RouterContainer,
  Routes,
  Route,
} from "react-router-dom";
import PrivateRoute from "../routes/PrivateRoute";
import AnonymousRoute from "../routes/AnonymousRoute";
import NotFound from "../pages/NotFound";
import Layout from "../Layout";

export default function Router() {
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
    <RouterContainer>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Frontpage />} exact />
              <Route path="/profile" element={<Profile />} exact />
            </Route>
          </Route>
          <Route element={<AnonymousRoute />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </RouterContainer>
  );
}
