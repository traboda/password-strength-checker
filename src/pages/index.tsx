import Head from 'next/head'
import {useEffect, useState} from "react";
import calculatePasswordStrength from "@/utils/crackTime";
import {ZxcvbnResult} from "@zxcvbn-ts/core";

const HomePage = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState<ZxcvbnResult|null>(null)

    useEffect(() => {
        if(searchTerm?.length > 0) {
            calculatePasswordStrength(searchTerm).then((r) => setResult(r));
        }
    }, [searchTerm]);

  return (
    <>
      <Head>
        <title>Password Strength Checker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
         <input
            type="password"
            placeholder="Enter Your Password"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
         />
          {result && (
          <div>
              <div>
                  {result.score/5 * 100}% ({result.score}/5)
              </div>
          </div>)}
      </main>
    </>
  )
};

export default HomePage;
