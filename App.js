import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [enteredValue, setEnteredValue] = useState("");
  const [editor, setEditor] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/editorlist")
      .then(response => {
        setEditor(response.data);
        setEnteredValue("");
      })
      .catch(error => {
        console.error("Error fetching editor list:", error);
      });
  }, []);

  const handleValueChange = (evt) => {
    setEnteredValue(evt.target.value);
  };

  const addEditor = () => {
    axios.post("http://localhost:5000/addeditor", { neweditor: enteredValue })
      .then(() => {
        setEditor([...editor, { name: enteredValue }]);
        setEnteredValue("");
      })
      .catch(error => {
        console.error("Error adding editor:", error);
      });
  };

  return (
    <div>
      <input
        value={enteredValue}
        onChange={handleValueChange}
        placeholder="Enter a value..."
      />

      <button onClick={addEditor}>Save</button>

      {editor.map((item, index) => (
        <h1 key={index}>{item.name}</h1>
      ))}
    </div>
  );
}

export default App;
