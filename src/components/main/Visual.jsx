import { useFlickrQuery } from '../../hooks/useFlickr';
import Pic from '../common/Pic';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';

export default function Visual() {
	const [Index, setIndex] = useState();

	const { data } = useFlickrQuery({ type: 'mine' });
	return (
		<figure className='visual'>
			{/* Img titles */}
			<div className='textBox'>
				{data?.map((el, idx) => (
					// <h2 key={idx}>{el.title.substr(0, 30)}</h2>
					<h2 key={idx} className={Index === idx ? 'on' : ''}>
						{el.title.substr(0, 30)}
					</h2>
				))}
			</div>

			{/* Img Pics */}
			{/* onSlideChange 이벤트 발생시 내부 순서값 구하는 프로퍼티로 index (loop:x), realIndex (loop: 0) */}
			<Swiper
				slidesPerView={3}
				spaceBetween={100}
				loop={true}
				centeredSlides={true}
				onSlideChange={el => setIndex(el.realIndex)}>
				{/* <Swiper
				slidesPerView={3}
				spaceBetween={100}
				loop={true}
				effect={'coverflow'}
				coverflowEffect={{
					rotate: 50, //패널별 회전 각도
					stretch: 0, //패널간의 당겨짐 정도
					depth: 100, //원근감 정도
					modifier: 1, //위 3가지 속성의 중첩감도 비율
					slideShadows: true //패널의 그림자
				}}
				modules={[EffectCoverflow]}> */}
				{data?.map((pic, idx) => {
					if (idx >= 10) return null;
					return (
						<SwiperSlide key={idx}>
							{/* swiperSlide요소에는 바로 css모션 스타일 적용 비권장 */}
							<div className='inner'>
								<Pic
									src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
									style={{ width: '100%', height: '100%' }}
									shadow
								/>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}
