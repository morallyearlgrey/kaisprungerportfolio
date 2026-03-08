import type { Metadata } from "next";
import ProjectsPage from "@/components/projects/projectspage";

const pageTitle = "Projects | Kai Sprunger";
const pageDescription = "A collection of full-stack, machine learning, and systems projects.";

export const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: "https://kaisprunger.com/projects",
        type: "website",
    },
};

export default function Projects() {
    return <ProjectsPage />;
}