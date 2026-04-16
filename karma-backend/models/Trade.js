const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true, 
    },

    acceptedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: null, 
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    offer: {
      type: String,
      required: true,
    },

    lookingFor: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
            'Programming & Tech Skills',
            'Academic Tutoring',
            'Languages & Communication',
            'Design & Creative Skills',
            'Music & Performing Arts',
            'Fitness, Yoga & Sports',
            'Personal Development',
            'Business & Marketing',
            'Cooking & Baking',
            'Handicrafts & DIY',
            'Photography & Video',
            'Lifestyle & Wellness',
            'Gardening & Sustainability',
            'Home & Practical Skills',
            'Other'
      ],
      required: true,
    },

    karmaValue: {
      type: Number,
      default: 10,
      min: 0,
    },

    duration: {
      type: Number, 
    },

    status: {
      type: String,
      enum: ["active", "in-progress", "completed", "cancelled"],
      default: "active",
    },

    tags: [String],
    completionConfirmedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trade", tradeSchema);
