export type StoryChapter = {
  id: string;
  title: string;
  locationKey: string;
  emotionalBeat: string;
  futureNotes: string[];
};

export const storyOutline: StoryChapter[] = [
  {
    id: 'chapter-01-first-warmth',
    title: 'The First Warmth',
    locationKey: 'cafe-night',
    emotionalBeat: 'A quiet opening about the first feeling that something special had started.',
    futureNotes: [
      'Replace with the real first meeting or first meaningful conversation.',
      'Add one small object that only makes sense to both of you.'
    ]
  },
  {
    id: 'chapter-02-rain-walk',
    title: 'Rain Walk',
    locationKey: 'rainy-street',
    emotionalBeat: 'A gentle walk where the city becomes private and soft.',
    futureNotes: [
      'Add a memory about walking together, waiting together, or not wanting to say goodbye.',
      'Use rain ambience and a slower camera zoom.'
    ]
  },
  {
    id: 'chapter-03-home-light',
    title: 'Home Light',
    locationKey: 'apartment',
    emotionalBeat: 'The relationship becomes familiar, domestic, safe.',
    futureNotes: [
      'Add photo memories, inside jokes, shared routines, favorite food or music.',
      'Branch dialogue by mood: tender, funny, vulnerable.'
    ]
  },
  {
    id: 'chapter-04-honest-height',
    title: 'Honest Height',
    locationKey: 'rooftop',
    emotionalBeat: 'A cinematic confession scene above the city.',
    futureNotes: [
      'Use this for the strongest emotional dialogue.',
      'Let the player pause before answering.'
    ]
  },
  {
    id: 'chapter-05-winter-promise',
    title: 'Winter Promise',
    locationKey: 'snowy-street',
    emotionalBeat: 'A calm ending that feels like a promise instead of a finale.',
    futureNotes: [
      'Add final message for her.',
      'Optionally unlock a gallery of memories after this chapter.'
    ]
  }
];
