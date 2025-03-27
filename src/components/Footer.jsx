export default function Footer() {
  return (
    <footer className="relative p-4 text-gray-600 z-10">
      <div className="container mx-auto">
        <p className="text-center ">
          Copyright © {new Date().getFullYear()}{" "}
          <a
            href="https://www.linkedin.com/in/mihaibancila06/"
            className="underline hover:text-[var(--color-secondary-500)] pointer transition duration-300"
            target="_blank"
          >
            Mihai Bancila
          </a>
        </p>
      </div>
    </footer>
  );
}
