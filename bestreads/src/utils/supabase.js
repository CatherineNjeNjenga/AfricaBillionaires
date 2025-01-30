import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const useData = () => {
  const [profiles, setProfiles] = useState([])
  console.log(profiles)

  useEffect(() => {
    (async function () {
      const { data } = await supabase.from("AfricaBillionaires").select();
      setProfiles(data)
    })()
  }, [])

  return profiles
}

export default useData
