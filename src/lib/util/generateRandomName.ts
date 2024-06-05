export const generateRandomName = (): string => {
	const adjectives = ['Quick', 'Lazy', 'Happy', 'Sad', 'Angry', 'Brave', 'Calm'];
	const nouns = ['Fox', 'Dog', 'Cat', 'Lion', 'Tiger', 'Bear', 'Wolf'];

	const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

	return `${randomAdjective}${randomNoun}`;
};
