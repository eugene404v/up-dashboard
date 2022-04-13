import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import styles from "./Slider.module.css"
import SwiperCore, {Pagination,Navigation} from 'swiper/core';
import SliderThumb from './SliderThumb';
import { photoType } from 'types/photoTypes';

SwiperCore.use([Pagination,Navigation]);

type propsType = {
    photos: photoType[];
    index: number;
    onSlide: (i: number) => void;
    onClick?: () => void;
}

function Slider({photos, index, onClick, onSlide}: propsType) {
    const [activeThumb, setActiveThumb] = React.useState(0)
    const [swiper, setSwiper] = React.useState<SwiperCore>()

    const thumbClickHandler = (i: number) => {
        swiper?.slideToLoop(i)
        onSlide(i)
    }

    const slideHandler = (swiper: SwiperCore) => {
        setActiveThumb(swiper.realIndex)
        onSlide(swiper.realIndex)
    }

    React.useEffect(() => {
        swiper?.slideToLoop(index)
    }, [index])
    
    return (<>
        <Swiper
            spaceBetween={0}
            slidesPerView={'auto'}
            onSlideChange={slideHandler}
            onSwiper={(swiper) => setSwiper(swiper)}
            pagination={{"type": "fraction"}} 
            navigation={true}
            loop 
            centeredSlides
            initialSlide={index}
        >
            {photos.map((el, i) => <SwiperSlide className={styles.slide} onClick={onClick}>
                <img className={styles.img} src={el.image_lg} key={el.id} />
            </SwiperSlide>)}
            
            
        </Swiper>
        <div className={styles.thumbs}>
            {photos.map((el, i) => <SliderThumb onClick={() => thumbClickHandler(i)} src={el.image_lg} key={el.id} isActive={i==activeThumb} />)}
        </div>            
    </>)
}

export default Slider
