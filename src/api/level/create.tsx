import { useModalStore } from '@/hooks/useModalStore';
import auth from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateLevelData {
  bungCount: number;
  bungName: string;
  tags: string[];
  files: File[];
}

interface CreateSuggestLevelData {
  bungName: string;
  tags: string[];
}

async function createLevel(data: CreateLevelData) {
  const formData = new FormData();

  const levelData = {
    bungCount: data.bungCount,
    bungName: data.bungName,
    tags: data.tags,
  };

  const levelDataBlob = new Blob([JSON.stringify(levelData)], {
    type: 'application/json',
  });

  formData.append('bungLogData', levelDataBlob);

  for (const file of data.files) {
    formData.append('image', file, file.name);
  }

  const response = await auth.post(
    `${process.env.NEXT_PUBLIC_API_URL}/level/daily`,
    formData,
  );

  return response.data;
}

async function createSuggestLevel(data: CreateSuggestLevelData) {
  const response = await auth.post(
    `${process.env.NEXT_PUBLIC_API_URL}/level/suggest`,
    data,
  );
  return response.data;
}

export function useCreateLevel() {
  const { openModal } = useModalStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLevel,
    onSuccess: (data) => {
      if (data.code === 201) {
        openModal({
          title: '성공',
          description: '붕어빵 기록을 추가했어요.',
          type: 'success',
        });
        queryClient.invalidateQueries({ queryKey: ['dogams'] });
        router.push('/level');
      } else if (data.code === 400) {
        openModal({
          title: '오류',
          description: data.message,
          type: 'error',
        });
      }
    },
  });
}

export function useCreateSuggestLevel() {
  const { openModal } = useModalStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSuggestLevel,
    onSuccess: (data) => {
      if (data.code === 201) {
        openModal({
          title: '성공',
          description: '새 붕어빵 기록을 추가했어요.',
          type: 'success',
        });
        queryClient.invalidateQueries({ queryKey: ['dogams'] });
      } else if (data.code === 400) {
        openModal({
          title: '오류',
          description: data.message,
          type: 'error',
        });
      }
    },
  });
}
