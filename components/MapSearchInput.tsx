import { ChangeEvent, useState } from 'react';

type SetCoordinates = {
  setCenter: (center: { lat: number; lng: number }) => void;
};

const MapSearchInput: React.FC<SetCoordinates> = ({ setCenter }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [typingTimeout, setTypingTimeout] = useState<number | any>(0);

  const searchHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e?.target?.value;

    setSearchText(searchValue);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    try {
      const timeOutValue = setTimeout(async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/search-address?title=${searchValue}`
        );
        const result = await response.json();

        if (result[0]) {
          const { lat, lng } = result[0];
          setCenter({ lat, lng });
        }
      }, 700);

      setTypingTimeout(timeOutValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='map-search-wrapper'>
      <input type='text' onChange={searchHandler} value={searchText} />

      {!searchText && (
        <p>
          <i>&#x1F50E;&#xFE0E;</i>
          جستجو در <span> تهران </span>
        </p>
      )}
    </div>
  );
};

export default MapSearchInput;
