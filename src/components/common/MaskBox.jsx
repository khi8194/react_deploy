/*
import { useLocation } from 'react-router-dom';
import useSplitText from '../../hooks/useSplitText';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MaskText from './MaskText';

export default function Layout({ title, children }) {
	const ref_title = useRef(null);
	const splitText = useSplitText();
	const { pathname } = useLocation();
	const isDetail = pathname.includes('/youtube/');

	useEffect(() => {
		splitText(ref_title, { interval: 0.1 });
	}, [splitText]);
	//useEffect에 의존성 배열에 특정 값을 등록하라고 뜨는 경우
	//해당 컴포넌트자체적으로 제어되지 않는 요소가 useEffect안쪽에서 활용되고 있을때 등록하라는 권고 사항 출력
	//해결 방법: 등록 처리 (잘못등록하면 재귀적호출 되면서 무한호출 문제)
	//무한호출시 해결방법 : useMemo, useCallback등의 메모이제이션 훅을 이용해서 강제로 메모리에 등록후 사용

	return (
		<main className={isDetail ? 'detail' : title.toLowerCase()}>
			<h1 ref={ref_title}>{title}</h1>

			<MaskText duration={1} delay={0} color={'#000'}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, ad?
			</MaskText>
			<br />

			<MaskText duration={0.6} delay={1} color={'#555'}>
				Lorem ipsum dolor
			</MaskText>

			<motion.section
				initial={{ opacity: 0, y: 200 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 200, transition: { delay: 0 } }}
				transition={{ duration: 1, delay: 0.7, ease: 'linear' }}>
				{children}
			</motion.section>
		</main>
	);
}
*/
import { motion } from 'framer-motion';

export default function MaskBox({ children, duration = 0.5, delay = 0, color = '#000', style }) {
	//기본 스타일 객체
	//외부 스타일 파일로 스타일 지정하면 해당 컴포넌트를 범용적으로 사용하기 번거로움
	//이러한 문제점을 개선하기 위해 대안책 (tailwindCSS, styleComponent, 스타일 객체를 직접 내부에 생성)
	const frameStyle = {
		display: 'inline-block',
		position: 'relative',
		overflow: 'hidden'
	};
	const maskStyle = {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
		backgroundColor: color
	};

	return (
		//텍스트를 감싸주는 Wrapper
		<div style={{ ...frameStyle, ...style }}>
			{/* children으로 전달된 실제 텍스트를 span으로 전달된 요소 */}
			<motion.div
				style={{ width: '100%', height: '100%' }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { delay: 0 } }}
				transition={{ duration: 0.01, delay: duration / 2 + delay }}>
				{children}
			</motion.div>

			{/* wrapper 안쪽에 실제 텍스트를 가져줄 마스크 요소 */}
			<motion.div
				style={maskStyle}
				initial={{ x: '-101%' }}
				animate={{ x: '101%' }}
				transition={{ duration, delay, ease: 'linear' }}></motion.div>
		</div>
	);
}
