import BackButton from '@/components/common/BackButton';
import { CreateDogamForm } from '@/components/CreateDogamForm';

export default function DogamCreatePage() {
  return (
    <section className="h-screen px-5 py-8">
      <header className="flex flex-col mb-2">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-[#181818]">
            제안할 붕어빵의
            <br />
            정보를 입력해주세요
          </h1>
        </div>
      </header>
      <div className="h-[calc(100%-140px)]">
        <CreateDogamForm />
      </div>
    </section>
  );
}
