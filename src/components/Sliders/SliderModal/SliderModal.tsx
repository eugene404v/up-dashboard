import Modal from 'components/Modals/Modal'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import styles from "./SliderModal.module.css"
import SwiperCore, { Pagination, Navigation } from 'swiper/core';
import SliderThumb from '../SliderThumb';
import { photoType } from 'types/photoTypes';

SwiperCore.use([Pagination, Navigation]);

const imgs = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Virginia_class_submarine.jpg/800px-Virginia_class_submarine.jpg",
    "https://dfnc.ru/en/wp-content/uploads/2021/03/maxresdefault1_0-900x444.jpg",
    "https://trendymen.ru/images/article1/131671/prev1131671.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%9A-560_%C2%AB%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BE%D0%B4%D0%B2%D0%B8%D0%BD%D1%81%D0%BA%C2%BB.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Virginia_class_submarine.jpg/800px-Virginia_class_submarine.jpg",
    "https://dfnc.ru/en/wp-content/uploads/2021/03/maxresdefault1_0-900x444.jpg",
    "https://trendymen.ru/images/article1/131671/prev1131671.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%9A-560_%C2%AB%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BE%D0%B4%D0%B2%D0%B8%D0%BD%D1%81%D0%BA%C2%BB.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Virginia_class_submarine.jpg/800px-Virginia_class_submarine.jpg",
    "https://dfnc.ru/en/wp-content/uploads/2021/03/maxresdefault1_0-900x444.jpg",
    "https://trendymen.ru/images/article1/131671/prev1131671.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%9A-560_%C2%AB%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BE%D0%B4%D0%B2%D0%B8%D0%BD%D1%81%D0%BA%C2%BB.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Virginia_class_submarine.jpg/800px-Virginia_class_submarine.jpg",
    "https://dfnc.ru/en/wp-content/uploads/2021/03/maxresdefault1_0-900x444.jpg",
    /*"https://trendymen.ru/images/article1/131671/prev1131671.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%9A-560_%C2%AB%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BE%D0%B4%D0%B2%D0%B8%D0%BD%D1%81%D0%BA%C2%BB.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Virginia_class_submarine.jpg/800px-Virginia_class_submarine.jpg",
    "https://dfnc.ru/en/wp-content/uploads/2021/03/maxresdefault1_0-900x444.jpg",
    "https://trendymen.ru/images/article1/131671/prev1131671.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%9A-560_%C2%AB%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BE%D0%B4%D0%B2%D0%B8%D0%BD%D1%81%D0%BA%C2%BB.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Virginia_class_submarine.jpg/800px-Virginia_class_submarine.jpg",
    "https://dfnc.ru/en/wp-content/uploads/2021/03/maxresdefault1_0-900x444.jpg",
    "https://trendymen.ru/images/article1/131671/prev1131671.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/40/%D0%9A-560_%C2%AB%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BE%D0%B4%D0%B2%D0%B8%D0%BD%D1%81%D0%BA%C2%BB.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Virginia_class_submarine.jpg/800px-Virginia_class_submarine.jpg",
    "https://dfnc.ru/en/wp-content/uploads/2021/03/maxresdefault1_0-900x444.jpg"*/
]


type propsType = {
    photos?: photoType[];
    files?: string[];
    index: number;
    onClose: () => void;
    onSlide: (i: number) => void;
}

function SliderModal({ photos, index, onClose, onSlide, files }: propsType) {
    const [activeThumb, setActiveThumb] = React.useState(index)
    const [swiper, setSwiper] = React.useState<SwiperCore>()

    const thumbClickHandler = (i: number) => {
        swiper?.slideToLoop(i)
        onSlide(i)
    }

    const slideHandler = (swiper: SwiperCore) => {
        setActiveThumb(swiper.realIndex)
        onSlide(swiper.realIndex)
    }

    return (
        <Modal title="" onClose={onClose} classnames={styles.modal}>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={slideHandler}
                onSwiper={(swiper) => setSwiper(swiper)}
                pagination={{ "type": "fraction" }}
                navigation={true}
                loop
                centeredSlides
                initialSlide={index}
            >
                {Array.isArray(files) && files.map((el, i) => <SwiperSlide className={styles.slide}>
                    <img className={styles.img} src={el} key={el + i} />
                </SwiperSlide>)}
                {Array.isArray(photos) && photos.map((el, i) => <SwiperSlide className={styles.slide}>
                    <img className={styles.img} src={el.image_lg} key={el.id} />
                </SwiperSlide>)}
            </Swiper>
            <div className={styles.thumbs}>
                {Array.isArray(files) && files.map((el, i) => <SliderThumb onClick={() => thumbClickHandler(i)} src={el} key={el + i} isActive={i == activeThumb} />)}
                {Array.isArray(photos) && photos.map((el, i) => <SliderThumb onClick={() => thumbClickHandler(i)} src={el.image_sm} key={el.id} isActive={i == activeThumb} />)}
            </div>
        </Modal>
    )
}

export default SliderModal
