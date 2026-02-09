import mongoose from "mongoose";

const studyPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    totalDays: Number,

    roadmap: [
      {
        day: Number,
        skill: String,
        topics: [String],
        wheretostudy: [
          {
            platform: String,
            resource: String,
            link: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("StudyPlan", studyPlanSchema);
