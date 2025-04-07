import { FadeIn } from "@/components/ui/FadeIn";
import Particles from "@/components/ui/Particles";
import getAuthUser from "@/lib/getAuthUser";
import supabase from "@/lib/storage";
import Link from "next/link";

export default async function HomePage() {
  return (
    <>
      <Particles
        speed={0.1}
        disableRotation={true}
        alphaParticles={true}
        className={
          "flex w-full h-full min-h-screen mx-auto text-center align-middle flex flex-col justify-center z-[-1]"
        }
        particleColors={["#0c9488", "#064a44", "#08685f"]}
      />
      <FadeIn duration={1000}>
        <div className="relative flex flex-col items-center min-h-[90vh] justify-center z-[10]">
          <div className="flex flex-row space-x-8 items-center justify-center mb-3 py-8">
            <Link
              href="/posts"
              className="text-sm font-medium text-gray-500 hover:text-[var(--color-primary)] dark:text-gray-300 dark:hover:text-[var(--color-secondary-500)] transition-all duration-300"
            >
              Blog posts
            </Link>
            <Link
              href="/projects"
              className="text-sm font-medium text-gray-500 hover:text-[var(--color-primary)] dark:text-gray-300 dark:hover:text-[var(--color-secondary-500)] transition-all duration-300"
            >
              Projects
            </Link>
            <Link
              href={"/contact"}
              className="text-sm font-medium text-gray-500 hover:text-[var(--color-primary)] dark:text-gray-300 dark:hover:text-[var(--color-secondary-500)] transition-all duration-300"
            >
              Contact
            </Link>
          </div>
          <h1 className="antialiased text-4xl uppercase py-6 ">Dev.Field</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg text-center">
            {`I'm a software engineer and a web developer. I love to build
            beautiful and functional websites.`}
          </p>
        </div>
      </FadeIn>
    </>
  );
}
