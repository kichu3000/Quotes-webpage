import { useEffect, useState } from 'react';
import './randomquotes.css'
import { FaQuoteLeft , FaQuoteRight ,FaTwitter} from "react-icons/fa6";
import axios from 'axios';

function Randomquotes() {


  const [quotes,setQuotes] = useState({
    'quote' : 'Do what you can, where you are, with what you have.',
    'author' : 'Teddy Roosevelt'
  })
  const [color,setColor] = useState(`rgba(0, 0, 0, 1)`)
  // const isMobile = window.innerWidth <= 768;

  const randomColor = () =>{
                  const r = Math.floor(Math.random() * 160)
                  const g = Math.floor(Math.random() * 160)
                  const b = Math.floor(Math.random() * 156)
                  return `rgb(${r},${g},${b})`
              }

  const fetchData = async () =>{

          const newcolor = randomColor();
          setColor(newcolor);
          document.body.style.backgroundColor = newcolor;

          // if(isMobile){
              const response = await axios.get('/quotes.json');
              console.log(response.data);
              const data = response.data;
              const randomIndex = Math.floor(Math.random() * data.length);
              const localQuote = data[randomIndex];
              console.log(localQuote);
              
              setQuotes({
                'quote' : localQuote.quote,
                'author' : localQuote.author
              })

          // }
          // else{
          //     const response = await axios.get(url);
          //     console.log(response.data[0]);
          //     const data = response.data[0];
          //     setQuotes({
          //       'quote' : data.content,
          //       'author' : data.author
          //     })

              // if (typeof document !== "undefined" && document.body) {
              // document.body.style.backgroundColor = newcolor;
              // }
          
  }

      

      useEffect(() => {
        fetchData();
      },[])


    return (
      <div>
        <div className="wrapper">
          <div className="container">
            <div className='quotes'>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem", display: "inline", alignItems: "flex-start", flexWrap: "wrap" }}>
                    <FaQuoteLeft
                      size="32"
                      style={{
                        marginRight: "10px",color: "#000",flexShrink: 0, }}
                    />
                    <p className='heading' style={{ color: color }}>
                      {quotes.quote}
                    </p>
                    <FaQuoteRight
                      size="32"
                      style={{ marginLeft: "10px", color: "#000", flexShrink: 0 }}
                    />
                </div>
                <h4  style={{ color: color }}>
                  - {quotes.author}
                </h4>
            </div>
            <div className="buttons">
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(` ${quotes.quote} -${quotes.author}`)}`}
                    className="twitter" 
                    style={{ backgroundColor: color }}
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaTwitter/>
                  </a>
                <button 
                  className="next-quote"
                  style= {{ backgroundColor: color }}
                  onClick={fetchData}
                >Change Quote</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Randomquotes
