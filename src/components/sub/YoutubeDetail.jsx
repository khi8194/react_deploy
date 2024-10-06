import { useParams } from 'react-router-dom';
import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import UseCombineText from '../../../hooks/useCombineText';

export default function YoutubeDetail() {
	//해당 컴포넌트 2번 재랜더링됨
	//YoubutVid상태값이 null상태로 렌더링되고 그때 fecthing가 받아온 데이터를 해당 상태에 담아주면서 2차 렌더링 발생
	const { id } = useParams();
	const [YoutubeVid, setYoutubeVid] = useState(null);
	const combineText = UseCombineText();
	// console.log(YoutubeVid);

	useEffect(() => {
		const api_key = import.meta.env.VITE_YOUTUBE_API;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;

		fetch(url)
			.then(data => data.json())
			.then(json => {
				setYoutubeVid(json.items[0]);
			});
	}, []);

	return (
		<Layout title={YoutubeVid?.snippet.title}>
			<figure className='vidFrame'>
				<iframe
					width='100%'
					height='100%'
					title='youtube'
					src={`https://www.youtube.com/embed/${YoutubeVid?.snippet.resourceId.videoId}`}></iframe>
			</figure>

			<p>{YoutubeVid?.snippet.resourceId.videoId}</p>
			<span>{combineText(YoutubeVid?.snippet.publishedAt.split('T')[0], '-', '.')}</span>
		</Layout>
	);
}

/*
  자가진단 항목
  1. useState를 이용해서 state에 값을 옮겨담고 state변경함수로 state값 변경처리
  2. useEffect구문의 구조를 파악하고 의존성 배열의 역할
  3. useState와 useEffect를 활용해서 서버 데이터 fetching처리후 state에 담기
  4. 다이나믹 라우터를 이용해서  /youtube/:id를 활용해서 상세페이지에 특정 id값 전달하는 방법
  5. 상태값에 있는 객체를 불러올떄 ?. 형태로 옵셔녈 체이닝을 처리하는 이유
  6. 커스텀훅 만드는 방법  (선택사항)
  7. useShortenText 커스텀훅 사용방법 (선택사항)
  8. useCombineText 커스텀훅 사용방법 (선택사항)
*/
