import Layout from "./components/Layout";
import About from "./pages/About";
import AdditionalContests from "./pages/AdditionalContests";
import Announcements from "./pages/Announcements";
import Awards from "./pages/Awards";
import BecomeSponsor from "./pages/BecomeSponsor";
import CategoryGuide from "./pages/CategoryGuide";
import Contact from "./pages/Contact";
import CurrentSponsors from "./pages/CurrentSponsors";
import Donate from "./pages/Donate";
import FindSchoolNumber from "./pages/FindSchoolNumber";
import HelpSessions from "./pages/HelpSessions";
import Home from "./pages/Home";
import HowToVideos from "./pages/HowToVideos";
import ISEF from "./pages/ISEF";
import ISAS from "./pages/ISAS";
import Judges from "./pages/Judges";
import Login from "./pages/Login";
import Membership from "./pages/Membership";
import Newsletters from "./pages/Newsletters";
import NotFound from "./pages/NotFound";
import OfficeHours from "./pages/OfficeHours";
import Regionals from "./pages/Regionals";
import Rules from "./pages/Rules";
import StartingProject from "./pages/StartingProject";
import State from "./pages/State";
import StudentRunners from "./pages/StudentRunners";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import ThermoFisher from "./pages/ThermoFisher";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="who-we-are" element={<Navigate to="/about" replace />} />
          <Route path="about/announcements" element={<Announcements />} />
          <Route path="about/newsletters" element={<Navigate to="/newsletter" replace />} />
          <Route path="newsletter" element={<Newsletters />} />
          <Route path="membership" element={<Membership />} />
          <Route path="contact" element={<Contact />} />
          <Route path="students" element={<Students />} />
          <Route path="students/starting-a-project" element={<StartingProject />} />
          <Route path="students/how-to-videos" element={<HowToVideos />} />
          <Route path="students/help-sessions" element={<HelpSessions />} />
          <Route path="students/category-guide" element={<Navigate to="/resources/category-guide" replace />} />
          <Route path="students/additional-contests" element={<Navigate to="/competition/additional-contests" replace />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="support/sponsor" element={<BecomeSponsor />} />
          <Route path="support/donate" element={<Donate />} />
          <Route path="support/current-sponsors" element={<CurrentSponsors />} />
          <Route path="volunteer/judges" element={<Judges />} />
          <Route path="volunteer/student-runners" element={<StudentRunners />} />
          <Route path="resources/rules" element={<Rules />} />
          <Route path="resources/office-hours" element={<OfficeHours />} />
          <Route path="resources/category-guide" element={<CategoryGuide />} />
          <Route path="resources/find-school-number" element={<FindSchoolNumber />} />
          <Route path="competition/regionals" element={<Regionals />} />
          <Route path="competition/state-exposition" element={<State />} />
          <Route path="competition/additional-contests" element={<AdditionalContests />} />
          <Route path="competition/isef" element={<ISEF />} />
          <Route path="awards" element={<Awards />} />
          <Route path="login" element={<Login />} />
          <Route path="judges" element={<Navigate to="/volunteer/judges" replace />} />
          <Route path="rules" element={<Navigate to="/resources/rules" replace />} />
          <Route path="regionals" element={<Navigate to="/competition/regionals" replace />} />
          <Route path="state" element={<Navigate to="/competition/state-exposition" replace />} />
          <Route path="isef" element={<Navigate to="/competition/isef" replace />} />
          <Route path="donors" element={<Navigate to="/support/current-sponsors" replace />} />
          <Route path="sponsorship" element={<Navigate to="/support/sponsor" replace />} />
          <Route path="thermo-fisher" element={<ThermoFisher />} />
          <Route path="isas" element={<ISAS />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
