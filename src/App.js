import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const url = 'http://localhost:5001/api';

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

function App() {
	const [allBooks, serAllBooks] = useState(null);
	const [currBook, setCurrBook] = useState('shir-hashirim');
	const [currChapterIndex, setCurrChapterIndex] = useState(null);
	const [currChapter, setCurrChapter] = useState(null);
	const [currVerseIndex, setCurrVerseIndex] = useState(null);
	const [currVerse, setCurrVerse] = useState(null);
	const [isChapterShown, setIsChapterShown] = useState(false);
	useEffect(() => {
		axios.get(url).then((res) => serAllBooks(res.data));
	}, []);

	useEffect(() => {
		if (currChapterIndex !== null) {
			setCurrChapter(allBooks[currBook][currChapterIndex]);
		}

		if (currVerseIndex !== null && currChapter !== null) {
			setCurrVerse(currChapter[currVerseIndex]);
		}
	}, [allBooks, currBook, currChapter, currChapterIndex, currVerseIndex]);

	function getDifferentRandomNumber(currNumber, min, max) {
		let newNumber = currNumber;
		if (min === max) {
			return min;
		} else {
			while (newNumber === currNumber) {
				newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
			}
		}

		return newNumber;
	}

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
			<h1>ברוכים הבאים ל- Song Helper</h1>
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
									<StyledChapterVerseContent>{verse}</StyledChapterVerseContent>
								)}
							</StyledChapterVerse>
						);
					})}
				</div>
			)}
		</>
	);
}

export default App;
