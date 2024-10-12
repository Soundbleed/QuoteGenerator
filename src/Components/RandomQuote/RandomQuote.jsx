import React, { useState, useEffect } from 'react';
import './RandomQuote.css'
import twitter_icon from "../Assets/twitter.png"
import refresh_icon from "../Assets/refresh-348.png"

const RandomQuote = () => {

    const [quote, setQuote] = useState(null);
    const [error, setError] = useState(null);

    async function loadQuotes() {
        try {
            const response = await fetch("https://api.quotable.io/random");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setQuote({
                text: data.content,
                author: data.author
            });
        } catch (error) {
            setError("Failed to fetch new quote. Please try again later.");
        }
    }

    useEffect(() => {
        loadQuotes();
    }, []);  // Empty dependency array ensures this only runs once on mount

    if (error) return <div>{error}</div>;
    if (!quote) return <div>Loading...</div>;

    return (
        <div className="Container" id="quote-box">
            <div className="quote" id="text">{quote.text}</div>
            <div className="line"></div>
            <div className="bottom">
                <div className="author" id="author">{quote.author}</div>
                <div className="icons">
                    <img src={refresh_icon} id="new-quote" alt="" onClick={loadQuotes} />
                    <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(quote.text)} - ${encodeURIComponent(quote.author)}`} target="_blank" rel="noopener noreferrer">
                        <img src={twitter_icon} alt="Share on Twitter" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomQuote