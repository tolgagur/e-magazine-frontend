import {UserProfileType} from "./userProfile-type";

export class ProfileModel{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  followedCount: number;
  followerCount: number;
  followed: boolean;
  profilePicture: string;
  posts: Array<UserProfileType> = [];
}
