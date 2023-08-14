import convertAddressToGeoCode from '../helpers/geocoding';
import * as collection from './collection.model';
import { IUser, IAddress, User } from './user.schema';
import bcrypt from 'bcrypt';

export async function createUser (
  username: string,
  email: string,
  password: string,
  address: IAddress
): Promise<IUser> {
  try {
    const geoLocation = await convertAddressToGeoCode(address);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      geoLocation,  
      credits: 0,
      reputation: 0,
      collections: [],
      inbox: [],
    });
    return newUser.save().then(async (user) => {
      const id = user._id;
      await collection.createOne('borrowed', id);
      await collection.createOne('lent out', id);
    })
    .then(() => newUser);
  } catch (err) {
    throw err;
  }
}

export async function findUserById (id: string): Promise<IUser | null> {
  try {
    return await User.findById(id);
  } catch (err) {
    throw err;
  }
}
export async function findUserByEmail (email: string): Promise<IUser | null> {
  try {
    return await User.findOne({ email });
  } catch (err) {
    throw err;
  }
}

export async function findUserByUsername (
  username: string
): Promise<IUser | null> {
  try {
    return await User.findOne({ username });
  } catch (err) {
    throw err;
  }
}

export async function addToUserCollection (userId: string, collectionId: string): Promise<any> {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { collections: collectionId } }
    );
    return updatedUser;
  } catch (err) {
    throw err;
  }
}
