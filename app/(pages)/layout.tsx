import Footer from "../components/Footer";
import Header from "../components/Header";

// app/(public)/layout.tsx
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
