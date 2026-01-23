export default function filterByExperience(jobs, experience) {
  if (!experience) return jobs;

  const map = {
    intern: ["intern", "internship", "trainee"],
    entry: ["fresher", "junior", "entry level"],
    mid: ["mid", "2 years", "3 years"],
    senior: ["senior", "lead", "5 years"]
  };

  const keywords = map[experience];

  return jobs.filter(job => {
    const text = `${job?.title || ""} ${job?.description || ""}`.toLowerCase();
    return keywords.some(word => text.includes(word));
  });
}
