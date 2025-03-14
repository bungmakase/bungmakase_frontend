'use client';

import { getDogams, getUserDogamDetail, getUserDogams } from '@/api/home';
import Logo from '@/components/common/Logo';
import { Modal } from '@/components/ui/modal';
import useToggle from '@/hooks/useToggle';
import { Dogam } from '@/types/home';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next/client';

const HomePage = () => {
  const router = useRouter();
  const [bungId, setSelectId] = useState(0);
  const [isOnboarding] = useState();
  const [isOpenDetail, toggleOpenDetail] = useToggle();
  const [isOpenCapture, toggleOpenCapture] = useToggle();

  const { data: dogams } = useQuery({
    queryKey: ['dogams'],
    queryFn: getDogams,
  });

  const { data: dogamsUser } = useQuery({
    queryKey: ['dogamsUser'],
    queryFn: getUserDogams,
  });

  const { data: dogamDetail } = useQuery({
    queryKey: ['dogamDetail', bungId],
    queryFn: () => getUserDogamDetail(bungId),
    enabled: !!bungId,
  });

  const onClickDetail = (id: number) => {
    setSelectId(id);
    toggleOpenDetail();
  };

  // 캡처된 화면을 이미지로 변환하여 다운로드 링크 생성
  const onClickCaptureBtn = () => {
    const element = document.body;

    html2canvas(element).then((canvas) => {
      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'screenshot.png';

        if (
          navigator.userAgent.includes('iPhone') ||
          navigator.userAgent.includes('iPad')
        ) {
          // iOS에서는 다운로드 대신 새 창에서 이미지 열기
          window.open(url);
        } else {
          link.click();
        }

        // URL 해제
        URL.revokeObjectURL(url);
      });
    });

    setTimeout(() => {
      toggleOpenCapture();
    }, 1000);
  };

  useEffect(() => {
    const localIsOnboard = localStorage.getItem('isOnboard');
    if (!localIsOnboard) {
      router.push('/onboarding');
    }
  }, [isOnboarding]);

  useEffect(() => {
    const token = getCookie('token');
    // TODO: backEnd user check token api
    if (token) router.push('/');
  }, []);

  if (!dogams?.data) return;

  return (
    <div className="bg-yellow-gradient h-screen relative content-to-capture">
      <p className="pt-28 font-medium text-2xl text-center text-third mb-[60px]">
        붕 도감
      </p>
      <p className="font-medium text-sm text-center text-third mb-7">
        발견한 붕어빵 : {dogamsUser?.data?.data?.length}개
      </p>

      <div className="pb-[100px] px-4">
        <div className="grid grid-cols-4 gap-[10px]">
          {dogams?.data?.data.map((dogam: Dogam) => {
            const isMatched = dogamsUser?.data?.data?.some(
              (item: Dogam) => item.bungId === dogam.bungId,
            );

            return (
              <div
                key={dogam.bungId}
                className={`rounded-[10px] flex items-center justify-center flex-col w-[76px] h-[76px] ${
                  isMatched ? 'bg-secondary cursor-pointer' : 'bg-[#FFF5DF]'
                }`}
                onClick={
                  isMatched
                    ? () => onClickDetail(Number(dogam.bungId))
                    : undefined
                }
              >
                <p className="font-medium text-[12px] my-1 text-center">
                  {dogam.bungName} <br />
                  붕어빵
                </p>
                <Logo size="small" type={isMatched ? 'default' : 'empty'} />
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="bg-[#FFEED0] text-primary px-4 h-12 flex items-center justify-center rounded-[999px] sticky bottom-20"
        onClick={onClickCaptureBtn}
      >
        <p>내 도감 캡쳐하기</p>
      </button>

      {/* 붕어빵 상세 모달 */}
      <Modal
        isOpen={isOpenDetail}
        onOpenChange={toggleOpenDetail}
        titleElement={
          <span className="text-third">
            {dogamDetail?.data?.data?.bungName}
          </span>
        }
      >
        <div className="flex flex-col items-center gap-8">
          <div className="w-[260px] h-[126px] flex items-center justify-center bg-[#FFEED0] border-solid border-[1px] border-[#FFD285] rounded-lg">
            <Logo size="medium" />
          </div>
          <div className="flex gap-2">
            {dogamDetail?.data?.data?.tags.map((tag: string) => (
              <span key={tag} className="font-light">
                # {tag}
              </span>
            ))}
          </div>
        </div>
      </Modal>
      {/* 캡쳐 완료 모달 */}
      <Modal
        isOpen={isOpenCapture}
        onOpenChange={toggleOpenCapture}
        titleElement="도감이 저장되었습니다."
      >
        <div>
          <Image
            src="/images/books.png"
            width={136}
            height={123}
            alt="books image"
          />
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
