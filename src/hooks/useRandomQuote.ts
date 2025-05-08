
"use Client";

import { useEffect, useState } from "react";

export const useRandomQuote = (quotes: string[]) => {
    const [quote, setQuote] = useState("");
  
    useEffect(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, [quotes]);
  
    return quote;
}
