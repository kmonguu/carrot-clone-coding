import TabBar from "@/app/common/components/tap-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
}
