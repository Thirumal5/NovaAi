import axios from 'axios'

export async function Adzunajob({role}) {
  
   const searchrole=role&&role.trim().length>0?role:"";

   try{
      const response=await axios.get("https://api.adzuna.com/v1/api/jobs/in/search/1",{
        params:{
          app_id:process.env.ADZUNA_APP_ID,
          app_key:process.env.ADZUNA_APP_KEY,
          what:searchrole,
          results_per_page:48,
        }
       
      })
      return response.data.results||[];
   }
   catch(err)
   {
    console.error("Adzuna error:", err.response?.data || err.message);
    return []
   }

}


