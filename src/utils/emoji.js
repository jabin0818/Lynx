import emojiRegex from 'emoji-regex'

import data from 'emoji-mart-vue-fast/data/all.json'
import { EmojiIndex } from 'emoji-mart-vue-fast'
let emojiIndex = new EmojiIndex(data)
const unicodeEmojiRegex = emojiRegex()

// 将文本中的emoji转为字符
export function emojiToText(text) {
    return text.replace(unicodeEmojiRegex, function (match, offset) {
        // const before = text.substring(0, offset)
        if (match === "🫢") {
            return ''
        } else {
            let emoji = emojiIndex.nativeEmoji(match)
            return emoji.colons
        }
    })
}

const COLONS_REGEX = new RegExp(
    '([^:]+)?(:[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?)',
    'g'
)

// 将文本中的字符转为emoji
export function textToEmoji(text) {
    return text.replace(COLONS_REGEX, function (match, p1, p2) {
        const before = p1 || ''
        let emoji = emojiIndex.findEmoji(p2)
        if (!emoji) {
            return match
        }
        if (emoji.native === "🥲") {
            return before
        } else {
            return before + emoji.native
        }
    })
}


/**
 * Convert Emoji to HTML to represent it as an image.
 * Emoji转换为HTML能够将它表示为一个形象。
 */
export function emojiToSpan(emoji) {
    let style = `background-position: ${emoji.getPosition()}`
    // The src="data:image..." is needed to prevent border around img tags.
    return `<span data-text="${emoji.native}" alt="${emoji.colons
        }" class='emoji-text' style="${style}">"${emoji.native}</span>`
}
export function emojiToHtml(emoji) {
    let style = `background-position: ${emoji.getPosition()}`
    // The src="data:image..." is needed to prevent border around img tags.
    return `<img data-text="${emoji.native}" alt="${emoji.colons
        }" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class='emoji-text' style="${style}">`
}
