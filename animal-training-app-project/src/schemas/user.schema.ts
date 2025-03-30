import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);

// this version is explicit and wont update if the schema changes
// going to use different implementation for now

// export type publicUserData = {
//   fullName: string;
//   email: string;
//   admin: boolean;
//   _id: string
// };

// this version is dynamic and will update if the schema changes 
export type publicUserData = Omit<
  mongoose.InferSchemaType<typeof userSchema>,
  "password"
> & {
  _id: string;
};
