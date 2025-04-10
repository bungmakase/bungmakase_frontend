'use client';

import { LabeledInfoField } from '@/components/common/LabeledInfoField';
import { Button } from '@/components/ui/button';
import { BottomDrawer, DrawerClose } from '@/components/common/BottomDrawer';
import { Modal } from '@/components/ui/modal';
import { CreateDogamForm } from '@/components/CreateDogamForm';
import { useState } from 'react';
import { Dogam } from '@/types/home';
import LoadingSpinner from '../LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { getDogams } from '@/api/home';

interface BungTypeSelectorProps {
  currentType: string;
  onTypeChange: (type: string) => void;
}

function BungTypeSelector({
  currentType,
  onTypeChange,
}: BungTypeSelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: dogams, isLoading } = useQuery({
    queryKey: ['dogams'],
    queryFn: getDogams,
  });

  if (isLoading) {
    return <LoadingSpinner text="붕어빵 종류를 불러오고 있어요..." />;
  }

  return (
    <BottomDrawer
      triggerElement={
        <div className="w-full cursor-pointer">
          <LabeledInfoField
            label="붕어빵 종류"
            value={currentType && `${currentType} 붕어빵`}
          />
        </div>
      }
    >
      <div className="flex flex-wrap gap-[5px] mb-4">
        {dogams &&
          dogams?.data?.data.map((dogam: Dogam) => (
            <div
              key={dogam.bungId}
              className={`${
                currentType === dogam.bungName && 'bg-[#FFA914] text-white'
              } p-3 text-sm rounded-full border border-[#d8d8d8] cursor-pointer hover:bg-gray-50 transition-colors`}
              onClick={() => onTypeChange(dogam.bungName)}
            >
              {dogam.bungName}
            </div>
          ))}
      </div>
      <Button
        type="button"
        className="mb-2 bg-[#FFEED0] text-[#FFA914] hover:bg-[#FFEED0]/50 transition-colors w-full"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        새 붕어빵 제안하기
      </Button>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        titleElement={
          <div className="flex flex-col text-center gap-2 pt-8">
            <h1 className="text-xl text-[#181818]">
              제안할 붕어빵의
              <br />
              정보를 입력해주세요
            </h1>
          </div>
        }
      >
        <div className="p-4">
          <CreateDogamForm callBackFunc={() => setIsModalOpen(false)} />
        </div>
      </Modal>
      <div className="flex gap-2">
        <DrawerClose asChild>
          <Button variant="outline" className="border-none bg-[#EBEBEB] flex-1">
            취소
          </Button>
        </DrawerClose>
        <DrawerClose asChild>
          <Button className="flex-1">확인</Button>
        </DrawerClose>
      </div>
    </BottomDrawer>
  );
}

export default BungTypeSelector;
