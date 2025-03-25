export default function Footer() {
  return (
    <footer className="p-4 bg-gray-100 text-gray-600">
      <div className="container mx-auto">
        <p className="text-center">
          Copyright © {new Date().getFullYear()}{" "}
          <a
            href="https://www.linkedin.com/in/mihaibancila06/"
            className="underline hover:text-blue-500"
            target="_blank"
          >
            Mihai Bancila
          </a>
        </p>
      </div>
    </footer>
  );
}
