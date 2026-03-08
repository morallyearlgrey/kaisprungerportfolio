import type { Metadata } from "next";
import SkillsPage from "@/components/skills/skillspage";

const pageTitle = "Skills | Kai Sprunger";
const pageDescription = "The programming languages, frameworks, and dev tools I know.";

export const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: "https://kaisprunger.com/skills",
        type: "website",
    },
};

export default function Skills() {
    return <SkillsPage />;
}