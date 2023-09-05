"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const [inputValue, setInputValue] = useState('');
  const {push} = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    push(`/prediction/${inputValue}`);
  }

  return (
    <div className="container mx-auto h-screen flex items-center">
      <div className="mx-auto w-1/2 p-7 bg-slate-400 border-2 border-white-100 rounded-md">
        <div className="text-center font-bold text-neutral-900 p-3 text-3xl">
          <h1>Enter your name:</h1>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-1 place-content-center py-5 border-solid border-t-[3px] ">
          <input 
            type="text" 
            placeholder="type your name..." 
            value={inputValue} 
            onChange={(e)=> setInputValue(e.target.value)}
            className="text-input text-black bg-gray-300 border-2 border-gray-700 rounded-md p-2"
          />
          <br />
          <button type='submit' className="button bg-slate-700 p-3 w-52 mx-auto rounded-full hover:bg-slate-900 ">Predict data</button>
        </form>
      </div>

    </div>
  )
}
