import { omit } from "lodash";
import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import User, { UserDocument } from "../model/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (err) {
    throw new Error(err);
  }
}

export async function checkIfUserExists(query: FilterQuery<UserDocument>) {
  try {
    const user = await User.findOne({ email: query.email }).lean();

    if (user) return false;

    return true;
  } catch (err) {
    throw new Error(err);
  }
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean();
}

// export function findAndUpdateUser(
//   query: FilterQuery<UserDocument>,
//   update: UpdateQuery<UserDocument>,
//   options: QueryOptions
// ) {
//   return User.findOneAndUpdate(query, update, options);
// }

export async function validatePassword({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: string;
}) {
  const user = await User.findOne({ email });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function getUsers() {
  try {
    return await User.find();
  } catch (err) {
    throw new Error(err);
  }
}
