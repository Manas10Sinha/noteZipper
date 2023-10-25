import "./App.css";
import LandingPage from "./Screens/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNotes from "./Screens/MyNotes/MyNotes";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import CreateNote from "./Screens/CreateNote/CreateNote";
import SingleNote from "./Screens/SingleNote/SingleNote";
import ProfileScreen from "./Screens/ProfileScreen/ProfileScreen";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" Component={LandingPage} exact />
        <Route path="/login" Component={LoginScreen} exact />
        <Route path="/register" Component={RegisterScreen} exact />
        <Route path="/createnotes" Component={CreateNote} exact />
        <Route path="/profile" Component={ProfileScreen} exact />
        <Route path="/notes/:id" Component={SingleNote} exact />
        <Route path="/mynotes" Component={() => <MyNotes />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
