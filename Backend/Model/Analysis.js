import mongoose from "mongoose";

const aiAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },

    skills: {
      type: [String],
      default: []
    },

    strengths: {
      type: [String],
      default: []
    },

    improvementPlan: {
      type: [String],
      default: []
    },

    missingSkills: {
      type: [String],
      default: []
    },

    overallScore: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const AIAnalysis = mongoose.model("AIAnalysis", aiAnalysisSchema);

export default AIAnalysis;
