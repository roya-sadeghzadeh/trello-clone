import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Board not found</h2>
        <p className="text-gray-600 mb-4">The board you are looking for does not exist.</p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
