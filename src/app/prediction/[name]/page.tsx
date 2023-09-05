"use client";

import { useRouter } from "next/navigation";

const getPredictedAge = async (name: string) => {
  const response = await fetch(`https://api.agify.io/?name=${name}`);
  return response.json();
}
const getPredictedGender = async (name: string) => {
  const response = await fetch(`https://api.genderize.io/?name=${name}`);
  return response.json();
}
const getPredictedCountry = async (name: string) => {
  const response = await fetch(`https://api.nationalize.io/?name=${name}`);
  return response.json();
}


interface Params {
  params:{name: string};
}


export default async function Page({params}: Params) {
  const {push} = useRouter();
  const lookup = require('country-code-lookup')

  const predictedAge = getPredictedAge(params.name);
  const predictedGender = getPredictedGender(params.name);
  const predictedCountry = getPredictedCountry(params.name);

  const [age, gender, country] = await Promise.all([predictedAge, predictedGender, predictedCountry]); 
  
  const onClick = () => {
  push('/');
  }

  return (
    <div className="container mx-auto h-screen flex items-center">
      <div className="mx-auto w-1/2 p-8 bg-slate-800 border-2 border-white-100 rounded-md">
        <div className="text-center font-bold p-3 text-3xl">
          <h1>Predictions for {params.name}</h1>
        </div>
        <div className="grid grid-rows-3 text-center gap-4 table-auto py-5 border-solid border-t-[3px] ">
          <div>Age: {(age.hasOwnProperty("age")) ? age?.age: `Data cannot be retrieved ${age?.error}`}</div>
          <div>Gender: {(gender.hasOwnProperty("gender")) ? gender?.gender: `Gender cannot be retrieved ${gender?.error}`}</div>
          <div>Country: {(country?.hasOwnProperty("country_id")) ? lookup.byInternet(country?.country[0]?.country_id).country: `Country cannot be retrieved ${country?.error}`}</div>
        </div>
        <div className="flex flex-items-center">
          <button className="button bg-slate-700 p-3 w-52 mx-auto rounded-full hover:bg-slate-900 " onClick={onClick}>Predict again?</button>
        </div>
      </div>
    </div>
  )
}
