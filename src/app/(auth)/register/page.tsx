import prisma from "@/db";

export default function Register() {
  return (
    <main className="bg-white p-4 rounded-xl shadow sm:w-1/2 m-auto">
      <h1>Register</h1>
      <form className="py-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input id="username" className="shadow bg-slate-100 rounded-md p-2"/>
        </div>
        <div className="flex justify-center">
          <button className="bg-sky-500 hover:bg-sky-400 rounded-md shadow text-white p-2">
            Register
          </button>
        </div>
      </form>
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
