import "./App.css";
import "./styles/style.scss";
import "./styles/media-query.css";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Detail from "./pages/Detail";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation/Navigation";
import { useEffect, useState } from "react";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import { auth } from "./firebase/firebase";
import { signOut } from "firebase/auth";
import { Divider } from "@chakra-ui/react";

function App() {
  const [active, setActive] = useState(-1);
  const [user, setUser] = useState(null);
  const [navLinksActive, setNavLinksActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setNavLinksActive(true);
      } else {
        setUser(null);
        setNavLinksActive(false);
        // navigate("/auth");
      }
    });
  }, [navLinksActive, setNavLinksActive]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };
  return (
    <div className="">
      <ToastContainer position="top-center" />
      <Navigation
        active={active}
        setActive={setActive}
        user={user}
        handleLogout={handleLogout}
        navLinksActive={navLinksActive}
        setNavLinksActive={setNavLinksActive}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              navLinksActive={navLinksActive}
              setNavLinksActive={setNavLinksActive}
              user={user}
            />
          }
        />

        <Route
          path="/search"
          element={<Home setNavLinksActive={setNavLinksActive} user={user} />}
        />
        <Route
          path="/detail/:id"
          element={<Detail setNavLinksActive={setNavLinksActive} />}
        />
        <Route path="/create" element={<AddEditBlog user={user} />} />
        <Route path="/update/:id" element={<AddEditBlog user={user} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/auth"
          element={<Auth setActive={setActive} setUser={setUser} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
