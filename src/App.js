import React, { useState } from "react";
import Status from './components/Status';
import Button from './components/Button';

const App = () => {
  const [text, setText] = useState("");
  const [autoSave, setAutoSave] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [saved, setSaved] = useState(true);

  const on_change = (event) => {
    const new_value = event.target.value;
    setText(new_value);
    if (!autoSave) {
      setSaved(false)};
  };

  const onSave = () => {
    localStorage.setItem('Saved Text',text);
    setSaved(true);
  };

  const onDelete = () => {
    setText("");
    if (!autoSave) {
      setSaved(false)
    };
  };

  const onAutoSave = () => {
    setAutoSave(!autoSave);
    setSaved(true);
  };

  React.useEffect(() => {console.log(autoSave)
    if (!firstRender)
      {localStorage.setItem("AutoSave Status",autoSave.toString())}
  }, [autoSave]);

  /* Runs on the first render */
  React.useEffect(() => {
    const data = localStorage.getItem('Saved Text');
    if (data) {
      setText(data)
    }
    const autoSaveSet = (localStorage.getItem('AutoSave Status') === 'true');
    console.log(autoSaveSet)
    if (autoSaveSet) {
      setAutoSave(_ => true)
      console.log('true')
    }
    setFirstRender(false);
  }, [])

  /* Automatically saves text upon changes */
  React.useEffect(() => {
    if (autoSave) {
      localStorage.setItem('Saved Text',text)
    }
  });

  return (
    <div className="w-full h-screen flex flex-row justify-center">
      <div className="flex flex-col justify-center">
        <h1 className="text-6xl mb-40">Text Saver</h1>
        <textarea
          value={text}
          onChange={on_change}
          className="border-2 mb-4 w-64 h-32 rounded-md p-2 shadow-md resize-none"
          placeholder="Sample Text"
        ></textarea>
        <div className='flex flex-row gap-3'>
          <Button onClick={onSave}>
            Save
          </Button>
          <Button onClick={onAutoSave}>
            Toggle AutoSave
          </Button>
          <Button onClick={onDelete}>
            Delete
          </Button>
        </div>
        <div className='justify-center'>
          <Status saveStatus={autoSave || saved}>
            Saved
          </Status>
          <Status saveStatus={autoSave}>
            Autosaved
          </Status>
        </div>
      </div>
    </div>
  );
};

export default App;
