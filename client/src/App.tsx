import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Main from "./components/Main";

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="my-3">
        <h4>Typescript Excel Import</h4>
      </div>
      <Main/>
    </div>
  );
}

export default App;
