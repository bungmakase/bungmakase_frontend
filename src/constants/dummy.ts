export interface Store {
  id: string;
  name: string;
  imageUrl: string;
  businessHours: string;
  rating: number;
  type: string;
  distance: string;
}

export const storeData: Store[] = [
  {
    id: '1',
    name: '붕어빵 가게 이름',
    imageUrl: '/images/sample_store.jpg',
    businessHours: '01:00에 영업 종료',
    rating: 4,
    type: '붕어빵 종류',
    distance: '현재 위치로부터 거리',
  },
  {
    id: '2',
    name: '붕어빵 가게 이름',
    imageUrl: '/images/sample_store.jpg',
    businessHours: '01:00에 영업 종료',
    rating: 4,
    type: '붕어빵 종류',
    distance: '현재 위치로부터 거리',
  },
];

export const bungDogamData = [
  {
    id: 'dogam1',
    name: '팥',
  },
  {
    id: 'dogam2',
    name: '슈크림',
  },
  {
    id: 'dogam3',
    name: '호두',
  },
  {
    id: 'dogam4',
    name: '치즈',
  },
  {
    id: 'dogam5',
    name: '딸기',
  },
  {
    id: 'dogam6',
    name: '초코',
  },
  {
    id: 'dogam7',
    name: '녹차',
  },
  {
    id: 'dogam8',
    name: '치즈',
  },
];
