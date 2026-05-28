import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsView from "@/components/ProjectsView";

export const metadata = { title: "Projects — Ju" };

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bg text-ink pt-14 sm:pt-24">
        <ProjectsView />
      </main>
      <Footer />
    </>
  );
}
