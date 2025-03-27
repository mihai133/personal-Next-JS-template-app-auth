export default async function LoadingArticles({ title }) {
  return (
    <main className="container max-w-[900px] mx-auto mt-10">
      <div className="flex flex-col gap-6 min-h-screen">
        <h1>{title}</h1>
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-92 mb-6"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-72 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-46 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-52 mb-6"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-2"></div>
          <span className="sr-only">Loading...</span>
        </div>
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-92 mb-6"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-72 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-46 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-52 mb-6"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-2"></div>
          <span className="sr-only">Loading...</span>
        </div>
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-92 mb-6"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-72 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-46 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-52 mb-6"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-2"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </main>
  );
}
