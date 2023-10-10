import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";

// Get current user in client components
const useCurrentUser = () => {
  const session = useSession();
  const user = session.data?.user;
  
  if (!user) return null

  const userId:number = (user as any).id
  // console.log("UserId:", userId);
  return userId;
};

// Get current user in server components / server actions
const getCurrentUser = async () => {
  // const session = await getServerSession()
  // const userId = session?.user
  // console.log("UserId:", userId)
  // return userId
  return 1
}

export {useCurrentUser, getCurrentUser };
