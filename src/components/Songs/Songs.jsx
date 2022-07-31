import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import getRandomNumberInRange from '../../helpers/getRandomNumberInRange';
import ALL_URLS from '../../constants/ALL_URLS';

const StyledWordSpan = styled.span`
	margin: 0 5px;
`;

function Songs() {
	const [allSongs, setAllSongs] = useState(null);
	const [words, setWords] = useState(null);
	const [amountOfWords, setAmountOfWords] = useState(1);

	function getOneRandomWord() {
		const randomSongIndex = getRandomNumberInRange(0, allSongs.length - 1);
		const randomSentenceIndex = getRandomNumberInRange(
			0,
			allSongs[randomSongIndex].lyrics.length - 1
		);
		const wordsArray =
			allSongs[randomSongIndex].lyrics[randomSentenceIndex].split(' ');

		const randomWordIndex = getRandomNumberInRange(0, wordsArray.length - 1);

		const word = wordsArray[randomWordIndex];

		return word;
	}

	function getRandomWords(amount) {
		const words = [];
		for (let i = 0; i < amount; i++) {
			words.push(getOneRandomWord());
		}

		setWords(words);
	}

	useEffect(() => {
		axios
			.get(`${ALL_URLS.dev}/wedding-songs`)
			.then((res) => setAllSongs(res.data));
	}, []);

	useEffect(() => {
		console.log(allSongs);
	}, [allSongs]);
	return (
		<>
			<h2>טקסטים משירים</h2>
			<div>
				<label>
					<span>הזן כמות מילים:</span>
					<input
						type="number"
						min={1}
						max={10}
						onChange={(e) => setAmountOfWords(Number(e.target.value))}
						value={amountOfWords}
					/>
				</label>
				<button onClick={() => getRandomWords(amountOfWords)}>
					קבל מילים אקראיות
				</button>
				<div>
					{words &&
						words.map((word, index) => (
							<StyledWordSpan key={index}>{word}</StyledWordSpan>
						))}
				</div>
			</div>
		</>
	);
}

export default Songs;
