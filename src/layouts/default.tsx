import { Link } from "@heroui/link";

import { Navbar } from "@/components/Navbar/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen w-full">
      <Navbar />
      <main className="flex-grow flex w-full container mx-auto max-w-7xl px-6 pt-16 min-h-0">
        {children}
      </main>
    </div>
  );
}
