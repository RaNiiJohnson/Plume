import { hash as _hash, compare, genSalt } from "bcrypt";
import { Schema, model } from "mongoose";

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const userSchema = new Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true,
    },
    picture: {
      type: String,
      default: process.env.BASE_URL + "users/random-user.png",
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minLength: 8,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

userSchema.statics.signUp = async function (pseudo, password) {
  const salt = await genSalt();

  const exist = await this.findOne({ pseudo });

  if (exist) {
    throw new Error("pseudo-exist");
  }

  if (!pseudo || pseudo.length < 3) {
    throw new Error("pseudo");
  }

  // if (!strongPasswordRegex.test(password) && password.length > 1) {
  //   throw new Error("password");
  // }

  if (password.length < 1) {
    throw new Error("no-pass");
  }

  const hash = await _hash(password, salt);

  const user = await this.create({ pseudo, password: hash });

  return user;
};

userSchema.statics.signIn = async function (pseudo, password) {
  const user = await this.findOne({ pseudo });
  if (user) {
    const auth = await compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("Incorrect pseudo");
};

const UserModel = model("user", userSchema);

export default UserModel;
