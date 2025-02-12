'use client';

import { storeData } from '@/constants/dummy';
import { SearchInput } from '../common/SearchInput';
import { useMutation } from '@tanstack/react-query';
import StoreInfo from '../common/StoreInfo';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SearchResponse {
  stores: {
    id: string;
    name: string;
    address: string;
    star: string;
    image: string;
    tag: string[];
    distance: number;
  }[];
}

// TODO: API 나오면 수정될 함수
async function searchStores(query: string): Promise<SearchResponse> {
  const response = await fetch(
    `/api/stores/search?query=${encodeURIComponent(query)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '검색 중 오류가 발생했습니다');
  }

  return response.json();
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const SearchSection = () => {
  const {
    mutate: search,
    isPending,
    data,
    error,
  } = useMutation({
    mutationFn: searchStores,
    onSuccess: (data) => {
      // 검색 결과 처리
      console.log('검색 결과:', data.stores);
      // 상위 컴포넌트로 결과 전달하거나 상태 관리
    },
    onError: (error: Error) => {
      // toast.error(error.message || '검색 중 오류가 발생했습니다');
    },
  });

  return (
    <>
      <SearchInput
        placeholder={'업체명으로 검색'}
        onSearch={search}
        loading={isPending}
      />
      <motion.div initial="hidden" animate="show" className="space-y-4">
        {storeData.map((store) => {
          return (
            <motion.div key={store.id} variants={item}>
              <div className="flex items-center gap-4">
                <div className="relative w-[100px] h-[100px]">
                  <Image
                    src={store.imageUrl}
                    alt={store.name}
                    fill
                    className="rounded-md"
                  />
                </div>
                <StoreInfo store={store} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
};

export default SearchSection;
