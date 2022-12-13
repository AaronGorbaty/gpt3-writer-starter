import Head from 'next/head';
import { useState } from 'react';
// import logo from './assets/logoATR.png';

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    
    <div className="root">

    
      <Head>
        <title>AsktheRabbiNew</title>
      </Head>
      


      <div className="container">
        <div className="header">
          
        {/* <div>
          <img src={logo} width="300" height="300"  alt="logoATR" />
        </div> */}

          
          <div className="header-title">
            <h1>Ask the Rabbi</h1>
          </div>
        
        </div>
        <div className="prompt-container">
          <textarea placeholder="Enter what you'd like to ask the Rabbi" 
          className="prompt-box" 
          value={userInput} 
          onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
   
    </div>
    {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
<div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
    </div>
  </a>
</div>

        </div>
      </div>
    </div>
  );
};

export default Home;
