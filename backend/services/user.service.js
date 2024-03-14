import { hashSync } from "bcrypt";
import {
  findByIdAndUpdate,
  findByIdAndDelete,
  findById,
} from "../models/user.model";
export async function updateUser(userId, updateData) {
  if (updateData.password) {
    try {
      updateData.password = await hashSync(updateData.password, 10);
    } catch (err) {
      throw err;
    }
  }
  try {
    const user = await findByIdAndUpdate(
      userId,
      {
        $set: updateData,
      },
      {
        new: true,
      }
    );
    return user;
  } catch (err) {
    throw err;
  }
}
export async function deleteUser(userId) {
  try {
    await findByIdAndDelete(userId);
  } catch (err) {
    throw err;
  }
}
export async function getUser(userId) {
  try {
    const user = await findById(userId);
    return user;
  } catch (err) {
    throw err;
  }
}
