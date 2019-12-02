type Emoji = string
type EmojiList = Emoji[]

const initialEmojis: EmojiList = [
  "😍",
  "🦄",
  "🍺",
  "😎",
  "😂",
  "😊",
  "✨",
  "😜",
  "🤓",
  "💩",
  "🤙",
  "💪",
  "👀",
  "🐳",
  "🚲",
  "💻",
]

function getNewEmojiList(): EmojiList {
  return Array.from(initialEmojis)
}

let currentListOfEmoji = getNewEmojiList()

/**
 * Remove emoji from pre-defined list and return it
 */
export default function getEmoji(): Emoji {
  // Select an emoji from a list
  const randomIndex = Math.floor(Math.random() * currentListOfEmoji.length)

  // Save emoji string for returning
  const emoji = currentListOfEmoji[randomIndex]

  // Remove the chosen emoji from the list
  currentListOfEmoji.splice(randomIndex, 1)

  // Init a new iteration through emojis, if needed
  if (currentListOfEmoji.length < 1) {
    currentListOfEmoji = getNewEmojiList()
  }

  return emoji
}
