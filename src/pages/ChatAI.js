import  { useRef, useState } from "react";

const ChatAI = () => {
  /**
   * This code demonstrates how to use the OpenAI API to generate chat completions.
   * The generated completions are received as a stream of data from the API and the
   * code includes functionality to handle errors and abort requests using an AbortController.
   * The API_KEY variable needs to be updated with the appropriate value from OpenAI for successful API communication.
   */

  const [mycontent, setContent] = useState({
                                                data: "",
                                            });
  const controller = useRef(null); // Store the AbortController instance
  // const signal = useRef()
  const StringRef = useRef("")

  const API_URL = "https://api.openai.com/v1/chat/completions";
  const API_KEY = "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";

 

  const generate = async (query) => {

    console.log("in generate")

    if (!query) {
      setContent({ data: "please enter prompt" });
      return;
    }


    controller.current =  new AbortController();
    const signal =  controller.current.signal;

    try {

      console.log("constroller in generate", controller);
      // Fetch the response from the OpenAI API with the signal from AbortController
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: query }],
          max_tokens: 500,
          stream: true, // For streaming responses
        }),
        signal, // Pass the signal to the fetch request
      });

      // Read the response as a stream of data
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      let string = []
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        // Massage and parse the chunk of data
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        const parsedLines = lines
          .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
          .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
          .map((line) => JSON.parse(line)); // Parse the JSON string
          
        for (const parsedLine of parsedLines) {
         
          const { choices } = parsedLine;
          const { delta } = choices[0];
          const { content } = delta;
          // Update the UI with the new content
          if (content) {
           
            StringRef.current += content
            
          }

        }
        setContent({data:StringRef.current }); 
      }
      
      // console.log(StringRef.current)
    
      StringRef.current = ""
      
    } catch (error) {

      // Handle fetch request errors
      if (signal.aborted) {
        setContent({ data: StringRef.current });
      } else {
        console.error("Error:", error);
        setContent({ data: "Error occurred while generating." });
      }
    } 
   
  };

  const stop = () => {
    // Abort the fetch request by calling abort() on the AbortController instance
    console.log("in stop")
    console.log(controller.current)
    if (controller.current) {
      controller.current.abort();
      controller.current = null ;
    }
    console.log("control", controller.current)
  };
  return { generate, mycontent ,stop, controller };
  
};

export default ChatAI;
