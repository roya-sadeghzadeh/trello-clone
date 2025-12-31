import { BoardView } from '@/features/board';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Board - Trello Clone`,
    description: 'Manage your tasks with this Kanban board',
  };
}

export default function BoardPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <BoardView boardId={params.id} />
    </Suspense>
  );
}
