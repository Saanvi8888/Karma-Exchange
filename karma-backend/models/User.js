const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    bio: {
      type: String,
      maxlength: 300,
      default: "",
    },


    skills: {
      type: [
        {
          name: { type: String, required: true, trim: true },
          category: {
            type: String,
            enum: [
              "Tutoring & Education",
              "Home Services",
              "Creative Arts",
              "Fitness and Wellness",
              "Gardening and Outdoor",
              "Cooking and Food",
              "Tech and IT",
              "Repairs and Maintenance",
              "Transportation",
              "Other"
            ],
            default: "Other"
          }
        }
      ],
      default: []
    },



    karma: {
      type: Number,
      default: 0,
      min: 0,
    },

    completedSessions: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save',async function (next) {
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password,salt);
    next();
    
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
    
}

module.exports = mongoose.model('User',userSchema);