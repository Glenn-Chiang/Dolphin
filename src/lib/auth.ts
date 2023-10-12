import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

// Get current user in client components
const useCurrentUser = () => {
  const session = useSession();
  const user = session.data?.user;
  if (!user) return null;
  const userId: number = (user as any).id; // ewww
  // console.log("UserId:", userId);
  return userId;
};

// Get current user in server components / server actions
const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) return null;
  const userId = (user as any).id; // ewww
  return userId;
};

export { useCurrentUser, getCurrentUser };
