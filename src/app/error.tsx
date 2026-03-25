"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-white text-xl mb-2">뭔가 잘못됐어요</h2>
        <p className="text-gray-500 text-sm mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
