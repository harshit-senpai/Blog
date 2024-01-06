import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const profile_imgs_name_list = [
  "Snuggles",
  "Bear",
  "Scooter",
  "Milo",
  "Oreo",
  "Nala",
  "Jack",
  "Jasmine",
  "Bailey",
  "Max",
  "Cuddles",
  "Sassy",
  "Zoey",
  "Missy",
  "Boo",
  "Gizmo",
  "Kitty",
  "Cali",
  "Smokey",
  "Baby",
];
let profile_imgs_collections_list = [
  "adventurer-neutral"
];

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      lowercase: true,
      required: true,
      minlength: [3, "fullname must be 3 letters long"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      lowercase: true,
      unique: [true, "Email already exists"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      select: false,
    },
    username: {
      type: String,
      minlength: [3, "Username must be 3 letters long"],
      unique: true,
    },
    bio: {
      type: String,
      maxlength: [200, "Bio should not be more than 200"],
      default: "",
    },
    profile_img: String,
    youtube: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    total_posts: {
      type: Number,
      default: 0,
    },
    total_reads: {
      type: Number,
      default: 0,
    },
    google_auth: {
      type: Boolean,
      default: false,
    },
    blogs: {
      type: [Schema.Types.ObjectId],
      ref: "blogs",
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: "joinedAt",
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export default mongoose.model("User", userSchema);
