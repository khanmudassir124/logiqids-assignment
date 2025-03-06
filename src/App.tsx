import { Provider } from "react-redux";
import "./App.css";
import Dashboard from "./screens/Dashboard";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
