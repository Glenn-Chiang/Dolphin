import PodPreview from "@/components/PodPreview";

const getPods = async () => {
  const pods = [
    {
      id: 1,
      name: "Programming",
      members: 100,
      description: "Software engineering, data science, cybersecurity, game development etc",
    },
    {
      id: 2,
      name: "Web dev",
      members: 80,
      description: "The community for frontend, backend and fullstack web developers",
    },
  ];
  return pods;
};

// Page displaying all 'pods' (communities) on the platform
export default async function Pods() {
  const pods = await getPods();
  return (
    <main>
      <h1>Explore Pods</h1>
      <ul className="py-4 flex flex-col gap-4">
        {pods.map((pod) => (
          <PodPreview key={pod.id} pod={pod} />
        ))}
      </ul>
    </main>
  );
}
