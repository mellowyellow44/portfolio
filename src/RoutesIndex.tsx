import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// import moment from "moment";
// import moment from "moment";
import Home from "./pages/Home/layout.tsx";

const RoutesIndex: React.FC = () => {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>

          {/* <NavBar /> */}
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>

        </Router>
      </LocalizationProvider>
    </Provider>
  );
};

export default RoutesIndex;
