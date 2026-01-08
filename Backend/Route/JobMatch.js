export function getMatchPercentage(resumeSkills = {}, jobText = "") {
  if (!jobText) return 0;

  jobText = jobText.toLowerCase();

  let matched = 0;
  let total = 0;

  for (const skill in resumeSkills) {
    total++;

    
    let cleanSkill = skill
      .replace(/_/g, " ")
      .replace(/\./g, "")
      .toLowerCase();

   
    const cleanJobText = jobText
      .replace(/\./g, "")
      .replace(/-/g, " ");

    if (cleanJobText.includes(cleanSkill)) {
      matched++;
    }
  }

  if (total === 0) return 0;

  return Math.round((matched / total) * 100);
}
