import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    experienceLevel: {
      type: String,
    },

    skills: {
      type: Map,
      of: Number,
      default: {},
    },

    matchedRoles: {
      type: [String],
      default: [],
    },

    strengths: {
      type: [String],
      default: [],
    },

    improvementPlans: {
      type: [String],
      default: [],
    },
    location:{
      type:[String],
      default:[]
    },
    missingSkills: {
      type: [String],
      default: [],
    },

    overallScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Analysis = mongoose.model("Analysis", analysisSchema);
export default Analysis;
