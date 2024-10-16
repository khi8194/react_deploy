import { useFlickrQuery } from '../../hooks/useFlickr';
import Pic from '../common/Pic';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
//AutoPlay 모듈 가져옴
import { Autoplay } from 'swiper/modules';
import { useState } from 'react';
import 'swiper/css';
import { FaPlay } from 'react-icons/fa';

//Swiper 컴포넌트 안쪽에서 호출할 자동롤링 시작 버튼 컴포넌트
function BtnStart() {
	//스와이퍼 전용 autoplay관련 메서드를 호출하기 위해서 useSwiper커스텀 훅으로 swiper 인스턴스 생성
	const swiper = useSwiper();
	console.log(swiper);

	return (
		//hidden(true: 숨김, false:보임), disabled(true:기능비활성화, false:기능활성화)
		// <button className='btnStart' onClick={() => swiper.autoplay.start()}>
		// 	롤링시작
		// </button>
		<button hidden={swiper.autoplay.running} className='btnStart' onClick={() => swiper.autoplay.start()}>
			<FaPlay />
		</button>
	);
}

export default function Visual() {
	const [Index, setIndex] = useState();
	const { data, isSuccess } = useFlickrQuery({ type: 'mine' });
	return (
		<figure className='visual'>
			<div className='textBox'>
				{/* 이미지 타이틀정보만 별로 뽑아서 Swipe 변경시마다 해당 순번의 타이틀도 같이 모션 처리 */}
				{data?.map((el, idx) => (
					<h2 key={idx} className={Index === idx ? 'on' : ''}>
						{el.title.substr(0, 30)}
					</h2>
				))}
			</div>

			<Swiper
				modules={[Autoplay]}
				slidesPerView={3} //한화면에 보일 패널 갯수
				spaceBetween={100} //패널 사이 간격 (px)
				loop={true} //true일때 좌우 순환
				centeredSlides={true} //복수개의 패널을 보이게 설정시 활성화 패널을 가운데 배치
				onSlideChange={el => setIndex(el.realIndex)} //슬라이드 변경될때마다 현재 활성화 패널순번을 Index상태값에 저장 (loop:true)
				autoplay={{ delay: 2000, disableOnInteraction: true }} //자동롤링시 인터벌 간격은 2초, 사용자 이벤트 발생하면 롤링 중지
				//swiper 준비 완료시 파라미터로 swiper 인스턴스 전달받고 해당 인스턴스로부터 전용 자동롤링 시작 메서드를 1초있다 강제 실행 (SwiperSlide동적 생성시간 벌어줌)
				onSwiper={swiper => setTimeout(() => swiper.autoplay.start(), 1000)}>
				{/* 데이터배열을 통해 동적생성되고 있는 Slide 컴포넌트 */}
				{isSuccess &&
					data.map((pic, idx) => {
						if (idx >= 10) return null;
						return (
							<SwiperSlide key={idx}>
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

				{/* 자동롤링 시작 버튼 컴포넌트 호출 */}
				<BtnStart />
			</Swiper>
		</figure>
	);
}
