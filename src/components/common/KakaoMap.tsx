/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef } from 'react';
import ReBoundButton from '../map/ReBoundButton';
import useGeolocation from '@/hooks/map/useGeolocation';
import { useCurrentAddress } from '@/store/useCurrentAddress';
import { useGetMarkers } from '@/api/map/marker';

interface KakaoMapProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = ({ children }: KakaoMapProps) => {
  const kakaoMapRef = useRef<HTMLElement | null | any>(null);
  const markerRef = useRef<any>(null);
  const { location, setLocation } = useCurrentAddress();
  const { myLocation } = useGeolocation();
  // const { data: markers } = useGetMarkers();

  console.log(location.latitude, location.longitude);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('static_map');
        const options = {
          center: new window.kakao.maps.LatLng(
            location.latitude || myLocation.latitude,
            location.longitude || myLocation.longitude,
          ),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        kakaoMapRef.current = map;

        const geocoder = new window.kakao.maps.services.Geocoder();

        setMyMarker(map.getCenter());

        window.kakao.maps.event.addListener(map, 'center_changed', () => {
          const center = map.getCenter();
          setMyMarker(center);
          getAddressFromCoords(center, geocoder);
        });

        getAddressFromCoords(map.getCenter(), geocoder);
      });
    };

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, []);

  const setMyMarker = (coords: any) => {
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    const imageSize = new window.kakao.maps.Size(55, 55);
    const markerImage = new window.kakao.maps.MarkerImage(
      '/images/marker.png',
      imageSize,
    );

    const myMarkerPosition = new window.kakao.maps.LatLng(
      coords.getLat(),
      coords.getLng(),
    );

    const myMarker = new window.kakao.maps.Marker({
      position: myMarkerPosition,
      image: markerImage,
    });

    myMarker.setMap(kakaoMapRef.current);
    markerRef.current = myMarker;
  };

  const getAddressFromCoords = (coords: any, geocoder: any) => {
    geocoder.coord2Address(
      coords.getLng(),
      coords.getLat(),
      (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const roadAddress = result[0].address?.address_name;
          setLocation({
            currentAddress: roadAddress,
            latitude: coords.getLat(),
            longitude: coords.getLng(),
          });
        }
      },
    );
  };

  const onClickReBound = () => {
    const moveLatLon = new window.kakao.maps.LatLng(
      myLocation.latitude,
      myLocation.longitude,
    );
    if (kakaoMapRef.current) {
      kakaoMapRef.current.panTo(moveLatLon);
    }
  };

  return (
    <div id="static_map" className="w-full h-screen relative">
      {children}
      {/* TODO: ReBoundButton position 조정 필요*/}
      <ReBoundButton
        onClickReBound={onClickReBound}
        position={{
          top: '',
          right: 'left-[10px]',
          bottom: 'bottom-[80px]',
          left: '',
        }}
      />
    </div>
  );
};

export default KakaoMap;
