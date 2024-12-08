import { YMaps, Map,Placemark } from '@pbe/react-yandex-maps';


const MapList = () => (
  <YMaps>
    <div>
      <Map width={'100vw'} height={'100vh'} defaultState={{ center: [54.989345, 73.368211], zoom: 14 }} />
      <Placemark defaultGeometry={[54.989345, 73.368211]} />
    </div>
  </YMaps>
);
export default MapList;