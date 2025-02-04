import { Link } from "@heroui/link";

import { Navbar } from "@/components/Navbar/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen w-full px-0">
      <Navbar />
      <main className="flex-grow flex-col w-full mx-auto max-w-full px-16 pt-8 min-h-0 ">
        {children}
      </main>
    </div>
  );
}
