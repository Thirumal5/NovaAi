import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
   
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobId: {
      type: String,
      required: true,
    },
     title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    applyurl:{
        type:String
    }
    ,
    skills: {
      type: [String],
      required: true,
    },

    source: {
      type: String,
      default: "Adzuna",
    },
    experienceLevel: {
      type: String,
      required: true,
    },
    companyname:{
        type:String

    },
    description: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
