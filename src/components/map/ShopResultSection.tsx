import { useSearchShopStore } from '@/store/useSearchShopStore';
import { SearchShopInfoType } from '@/types/map';
import ShopInfo from '../common/ShopInfo';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BottomDrawer } from '@/components/common/BottomDrawer';

export function ShopResultSection() {
  const { resultShopSearchInfo } = useSearchShopStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (resultShopSearchInfo && resultShopSearchInfo.length > 0) {
      setIsOpen(true);
    }
  }, [resultShopSearchInfo]);

  return (
    <BottomDrawer
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`w-full overflow-y-scroll bg-white`}
    >
      <div>
        {resultShopSearchInfo.map((item: SearchShopInfoType) => {
          return (
            <motion.div
              key={item.shopId}
              onClick={() => alert('서비스 준비중입니다...')}
            >
              <div className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 rounded-md">
                <ShopInfo shop={item} />
                <div className="relative">
                  <Image
                    width={100}
                    height={100}
                    src={item.imageUrl || '/images/sample_store.jpg'}
                    alt={item.shopName}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </BottomDrawer>
  );
}
