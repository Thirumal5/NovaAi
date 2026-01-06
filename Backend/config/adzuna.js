import axios from "axios"

export async function Adzunajob({ role }) {
  try {
    const searchRole = role && role.trim().length > 0
      ? role
      : "software developer"

    const response = await axios.get(
      "https://api.adzuna.com/v1/api/jobs/in/search/1",
      {
        params: {
          app_id: process.env.ADZUNA_APP_ID,
          app_key: process.env.ADZUNA_APP_KEY,
          what: searchRole,
          results_per_page: 50,
          content_type: "application/json"
        }
      }
    )

    console.log("Adzuna role:", searchRole)
    console.log("Adzuna results count:", response.data.results?.length || 0)

    return response.data.results || []

  } catch (error) {
    console.error("Adzuna API error:", error.response?.data || error.message)
    return []
  }
}
