import mongoose from "mongoose";

const performanceEnum = ["Outstanding", "Excellent", "Good", "Needs Work"];

const ResultSchema = new mongoose.Schema(
  {
    technology: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "html",
        "css",
        "js",
        "react",
        "node",
        "mongodb",
        "java",
        "python",
        "cpp",
        "bootstrap"
      ]
    },
    level: { type: String, required: true, enum: ["basic", "intermediate", "advanced"] },
    totalQuestions: { type: Number, required: true, min: 1 },
    correct: { type: Number, required: true, min: 0, default: 0 },
    wrong: { type: Number,  min: 0, default: 0 },
    score: { type: Number, min: 0, max: 100, default: 0 },
    performance: { type: String, enum: performanceEnum, default: "Needs Work" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
    type: String,
    required: true,
    trim: true,
   },

  },
  { timestamps: true }
);
// Auto-calculate score & performance
ResultSchema.pre("save", function (next) {
  const total = Number(this.totalQuestions) || 0;
  const correct = Number(this.correct) || 0;

  this.score = total ? Math.round((correct / total) * 100) : 0;

  if (this.score >= 90) this.performance = "Outstanding";
  else if (this.score >= 75) this.performance = "Excellent";
  else if (this.score >= 60) this.performance = "Good";
  else this.performance = "Needs Work";

  if (this.wrong === undefined || this.wrong === null) {
    this.wrong = Math.max(0, total - correct);
  }

  next();
});

const Result =
  mongoose.models.Result || mongoose.model("Result", ResultSchema);

export default Result;
