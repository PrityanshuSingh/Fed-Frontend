import { ColorRing } from 'react-loader-spinner';

export default function MicroLoading() {
  return (
      <ColorRing
        visible={true}
        height="40"
        width="40"
        ariaLabel="color-ring-loading"
        wrapperStyle={{
            marginTop: '-1rem', 
            marginBottom:"-0.8rem", 
            backgroundColor:"transparent",
            transition: ".2s linear"
        }}
        wrapperClass="containerLoading"
        colors={['white', 'white', 'white', 'white', 'white']}
      />
  );
}
