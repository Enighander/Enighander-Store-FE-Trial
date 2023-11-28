import React from 'react';
import { MDBCarousel, MDBCarouselItem} from 'mdb-react-ui-kit';
import Image1 from '../../assets/Promotion1.jpg'
import '../../assets/css/style.css'

const CarouselComponent = () => {
  return (
    <>
    <main id ="Carousel-Promote">
      <MDBCarousel showControls fade>
      <MDBCarouselItem itemId={1}>
        <img src={Image1} className='d-block w-100' alt='...' />
      </MDBCarouselItem>
    </MDBCarousel>
    </main>
    </>
  );
};

export default CarouselComponent;