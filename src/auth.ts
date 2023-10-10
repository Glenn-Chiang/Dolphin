import { useSession } from 'next-auth/react';
const getCurrentUser = () => {
  // return Math.random() >= 0.5 ? 1 : 2
  return 1
}

const useGetUser = () => {
  const session = useSession()
}

export {getCurrentUser}