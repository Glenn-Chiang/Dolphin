'use client'

import { CancelButton, SubmitButton } from "@/components/buttons";
import { useRouter } from "next/navigation";

const getCommunities = () => {
  const communities = [
    {
      id: 1,
      name: "programming",
    },
    {
      id: 2,
      name: "webdev",
    },
  ];
  return communities;
};

export default function CreatePost() {
  const communities = getCommunities();

  const router = useRouter()

  return (
    <main className="bg-white p-4 rounded-xl shadow">
      <h1>Create a Post</h1>
      <form className="py-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label>Select a community</label>
          <select className="shadow rounded-md p-2 bg-slate-50">
            {communities.map((community) => (
              <option key={community.id}>{community.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input id="title" className="shadow bg-slate-50 rounded-md p-2" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            className="shadow bg-slate-50 rounded-md p-2"
          />
        </div>
        <div className="flex gap-4">
          <SubmitButton text="Post"/>
          <CancelButton onClick={() => router.back()}/>
        </div>
      </form>
    </main>
  );
}

