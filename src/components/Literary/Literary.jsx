import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import getDifferentRandomNumber from '../../helpers/getDifferentRandomNumber';

import ALL_URLS from '../../constants/ALL_URLS';

const StyledChapterVerse = styled.p``;

const StyledChapterVerseContent = styled.span`
	background-color: ${(props) => (props.isCurrVerse ? '#e5e5fd' : '#fff')};
`;

function indexToVersesLetters(index) {
	const versesLettersArray = [
		'א',
		'ב',
		'ג',
		'ד',
		'ה',
		'ו',
		'ז',
		'ח',
		'ט',
		'י',
		'יא',
		'יב',
		'יג',
		'יד',
		'טו',
		'טז',
		'יז',
		'יח',
		'יט',
		'כ',
		'כא',
		'כב',
		'כג',
		'כד',
		'כה',
		'כו',
		'כז',
		'כח',
		'כט',
		'ל',
		'לא',
		'לב',
		'לג',
		'לד',
		'לה',
		'לו',
		'לז',
		'לח',
		'לט',
		'מ',
		'מא',
		'מב',
		'מג',
		'מד',
		'מה',
		'מו',
		'מז',
		'מח',
		'מט',
		'נ',
		'נא',
		'נב',
		'נג',
		'נד',
		'נה',
		'נו',
		'נז',
		'נח',
		'נט',
		'ס',
		'סא',
		'סב',
	];

	return versesLettersArray[index];
}

function Literary() {
	const [allBooks, serAllBooks] = useState(null);
	const [currBook, setCurrBook] = useState(null);
	const [currChapterIndex, setCurrChapterIndex] = useState(null);
	const [currChapter, setCurrChapter] = useState(null);
	const [currVerseIndex, setCurrVerseIndex] = useState(null);
	const [currVerse, setCurrVerse] = useState(null);
	const [isChapterShown, setIsChapterShown] = useState(false);

	useEffect(() => {
		axios.get(`${ALL_URLS.dev}/literary`).then((res) => serAllBooks(res.data));
	}, []);

	useEffect(() => {
		if (currChapterIndex !== null) {
			setCurrChapter(allBooks[currBook][currChapterIndex]);
		}

		if (currVerseIndex !== null && currChapter !== null) {
			setCurrVerse(currChapter[currVerseIndex]);
		}
	}, [allBooks, currBook, currChapter, currChapterIndex, currVerseIndex]);

	useEffect(() => {
		if (allBooks !== null) {
			setCurrBook('shir-hashirim');
		}
	}, [allBooks]);

	function handleClick() {
		const randChapterIndex = getDifferentRandomNumber(
			currChapterIndex,
			0,
			allBooks[currBook].length - 1
		);

		const randVerseIndex = getDifferentRandomNumber(
			currVerseIndex,
			0,
			allBooks[currBook][randChapterIndex].length - 1
		);

		setCurrChapterIndex(randChapterIndex);
		setCurrVerseIndex(randVerseIndex);
	}

	function changeChapterIndex(count) {
		const newChapterIndex = currChapterIndex + count;
		if (allBooks) {
			if (newChapterIndex >= 0 && newChapterIndex < allBooks[currBook].length) {
				setCurrChapterIndex(newChapterIndex);
				setCurrVerseIndex(0);
			}
		}
	}

	function changeVerseIndex(count) {
		const newVerseIndex = currVerseIndex + count;
		if (allBooks) {
			if (
				newVerseIndex >= 0 &&
				newVerseIndex < allBooks[currBook][currChapterIndex].length
			) {
				setCurrVerseIndex(newVerseIndex);
			}
		}
	}

	return (
		<>
			<h2>טקסטים מן המקורות</h2>
			<div>
				<button onClick={handleClick}>קבל פסוק רנדומלי</button>
				<button onClick={() => changeChapterIndex(1)}>פרק הבא</button>
				<button onClick={() => changeChapterIndex(-1)}>פרק הקודם</button>
				<button onClick={() => changeVerseIndex(1)}>פסוק הבא</button>
				<button onClick={() => changeVerseIndex(-1)}>פסוק הקודם</button>
				{currVerse && (
					<div>
						<p>פרק: {indexToVersesLetters(currChapterIndex)}</p>
						<p>פסוק: {indexToVersesLetters(currVerseIndex)}</p>
						<p>{currVerse}</p>
					</div>
				)}

				<button
					onClick={() => {
						setIsChapterShown(!isChapterShown);
					}}
				>
					{isChapterShown ? 'הסתר פרק נוכחי' : 'הצג פרק נוכחי'}
				</button>
				{allBooks && isChapterShown && (
					<div>
						{currChapter.map((verse, index) => {
							return (
								<StyledChapterVerse key={index}>
									<span>{indexToVersesLetters(Number(index))}: </span>
									{Number(index) === currVerseIndex ? (
										<StyledChapterVerseContent isCurrVerse={true}>
											{verse}
										</StyledChapterVerseContent>
									) : (
										<StyledChapterVerseContent>
											{verse}
										</StyledChapterVerseContent>
									)}
								</StyledChapterVerse>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
}

export default Literary;
