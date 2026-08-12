import Link from "next/link";

interface Project {
    _id: string;
    title: string;
    category: string;
    description: string;
}

export default function ProjectsSection({
    projects,
}: {
    projects: Project[];
}) {
    return (
        <>
            {projects.map((project, index) => (
                <div
                    key={project._id}
                    className="featured-card inline-block align-top w-[480px] flex-shrink-0"
                >
                    <h4>{project.title}</h4>

                    <p>{project.category}</p>

                    <p>{project.description}</p>

                    <span>
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </div>
            ))}
        </>
    );
}