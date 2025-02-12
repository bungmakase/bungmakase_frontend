'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BottomDrawer, DrawerClose } from '../common/BottomDrawer';
import { useImageUpload } from '@/hooks/useImageUpload';
import { LabeledInfoField } from '@/components/common/LabeledInfoField';
import { useReviewForm } from '@/hooks/useReviewForm';
import { bungDogamData } from '@/constants/dummy';
import { useRouter } from 'next/navigation';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

function StarRating({ rating, onRatingChange }: StarRatingProps) {
  return (
    <div className="py-8 flex gap-2">
      {Array.from({ length: 5 }).map((_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= rating;

        return (
          <Image
            key={`star-${starNumber}`}
            src={`/images/svg/star-${isFilled ? 'fill' : 'empty'}.svg`}
            alt={`${starNumber}점`}
            width={24}
            height={24}
            onClick={() => onRatingChange(starNumber)}
            className="cursor-pointer transition-transform hover:scale-110"
          />
        );
      })}
    </div>
  );
}

// TODO: 다중 이미지 업로드 구현 필요.
interface ImageUploadSectionProps {
  profileImage: string;
  isUploading: boolean;
  onImageClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ImageUploadSection({
  profileImage,
  isUploading,
  onImageClick,
  fileInputRef,
  onImageChange,
}: ImageUploadSectionProps) {
  return (
    <div className="w-full flex flex-col items-center mb-8">
      <div className="w-full h-[150px] flex justify-center items-center border border-[#d6d6d6] rounded-lg">
        {profileImage ? (
          <div className="relative w-32 h-32">
            <Image
              src={profileImage}
              alt="리뷰 이미지"
              fill
              className="rounded-lg object-cover"
            />
          </div>
        ) : (
          <AddImageButton onClick={onImageClick} isUploading={isUploading} />
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onImageChange}
          disabled={isUploading}
        />
      </div>
    </div>
  );
}

interface AddImageButtonProps {
  onClick: () => void;
  isUploading: boolean;
}

function AddImageButton({ onClick, isUploading }: AddImageButtonProps) {
  return (
    <Button
      type="button"
      className="w-[115px] h-[40px] bg-[#FFEED0] hover:bg-[#FFEED0]/50 transition-colors"
      onClick={onClick}
      disabled={isUploading}
    >
      <Image
        src="/images/svg/camera.svg"
        alt="이미지 추가"
        width={18}
        height={24}
      />
      <span className="text-xs text-[#FFA914]">
        {isUploading ? '업로드 중...' : '사진 추가'}
      </span>
    </Button>
  );
}

interface BungTypeSelectorProps {
  currentType: string;
  onTypeChange: (type: string) => void;
}

function BungTypeSelector({
  currentType,
  onTypeChange,
}: BungTypeSelectorProps) {
  const router = useRouter();

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
        {bungDogamData.map((dogam) => (
          <div
            key={dogam.id}
            className="p-3 text-sm rounded-full border border-[#d8d8d8] cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onTypeChange(dogam.name)}
          >
            {dogam.name}
          </div>
        ))}
      </div>
      <Button
        type="button"
        className="mb-2 bg-[#FFEED0] text-[#FFA914] hover:bg-[#FFEED0]/50 transition-colors w-full"
        onClick={() => router.push('/dogam/create')}
      >
        새 붕어빵 제안하기
      </Button>
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

export function ReviewForm() {
  const {
    fileInputRef,
    profileImage,
    isUploading,
    handleImageChange,
    handleImageClick,
  } = useImageUpload();

  const { formData, handleChange, handleSubmit } = useReviewForm();

  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <StarRating
        rating={formData.starRating}
        onRatingChange={(rating) => handleChange('starRating', rating)}
      />

      <ImageUploadSection
        profileImage={profileImage}
        isUploading={isUploading}
        onImageClick={handleImageClick}
        fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
        onImageChange={handleImageChange}
      />

      <BungTypeSelector
        currentType={formData.bungType}
        onTypeChange={(type) => handleChange('bungType', type)}
      />

      <textarea
        placeholder="붕어빵 가게에 대한 생생한 후기를 남겨보세요."
        className="w-full h-[170px] px-4 py-2 rounded-lg border border-[#d9d9d9] resize-none text-sm focus:outline-none focus:ring-2 focus:ring-[#FFA914] transition-all"
        value={formData.reviewContent}
        onChange={(e) => handleChange('reviewContent', e.target.value)}
      />

      <Button
        type="submit"
        className="mt-[50px] w-full transition-colors"
        disabled={isUploading}
      >
        {isUploading ? '업로드 중...' : '등록하기'}
      </Button>
    </form>
  );
}

export default ReviewForm;
