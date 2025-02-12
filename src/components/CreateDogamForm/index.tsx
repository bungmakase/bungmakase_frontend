'use client';

import { LabeledInfoField } from '../common/LabeledInfoField';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useDogamStore } from '@/store/useDogamStore';

export function CreateDogamForm() {
  const router = useRouter();
  const { type, info, setType, setInfo } = useDogamStore();

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2">
        <LabeledInfoField
          label="붕어빵 종류"
          isEditable
          value={type}
          placeholder={'직접 입력하기'}
          onChange={(value) => setType(value)}
        />
        <LabeledInfoField
          label="붕어빵 특징"
          isEditable
          value={info}
          placeholder={'# 직접 입력하기'}
          onChange={(value) => setInfo(value)}
        />
      </div>
      <Button className="mt-8" onClick={() => router.back()}>
        등록하기
      </Button>
    </div>
  );
}
