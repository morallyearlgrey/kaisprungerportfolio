import type { Metadata } from "next";
import ExperiencePage from "@/components/experience/experiencepage";

const pageTitle = "Experience | Kai Sprunger";
const pageDescription = "Internships and organization roles throughout my career.";

export const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: "https://kaisprunger.com/experiences",
        type: "website",
    },
};

export default function Experiences() {
    return <ExperiencePage />;
}