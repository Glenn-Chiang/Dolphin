import Link from 'next/link';

export default function TabLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="hover:bg-slate-200 p-2 rounded-2xl">
      <h2>{children}</h2>
    </Link>
  );
}
