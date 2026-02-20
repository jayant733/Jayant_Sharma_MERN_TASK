import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-blue-300 to-blue-500 p-10">
      
      <div className="max-w-6xl mx-auto mt-10 
                      bg-white/40 
                      backdrop-blur-2xl 
                      border border-white/50 
                      rounded-3xl 
                      shadow-2xl 
                      p-12">
        {children}
      </div>

    </div>
  );
}
