import prisma from "@/db";

export default function Register() {
  return (
    <main className="bg-white p-4 rounded-xl shadow">
      <h1>Register</h1>
      <form></form>
    </main>
  );
}

const createUser = async (name: string) => {
  await prisma.user.create({
    data: {
      name,
    },
  });
};
