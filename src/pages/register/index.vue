<template>
  <div class="row">
    <Picker
      :showPreview="false"
      :data="indexI18n"
      :i18n="i18n"
      set="twitter"
      @select="showEmoji"
    />
    <div class="">{{ emojisOutput }}</div>
    <div class="">
      <!-- <img
        data-text="😀"
        alt=":grinning:"
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        class="emoji-text"
        style="background-position: 53.33% 33.33%"
      /> -->
      <emoji :data="emojiIndex" emoji=":santa::skin-tone-3:" :size="32" />
      <emoji :data="emojiIndex" emoji="santa" set="twitter" :size="32" />
      <emoji :data="emojiIndex" :emoji="santaEmojiObject" :size="32" />
    </div>
  </div>

  <!-- <div class="row">
    <div>
      {{ emojisOutput }}
    </div>
  </div> -->
</template>

<script>
// Import data/twitter.json to reduce size, all.json contains data for
// all emoji sets.
import data from "emoji-mart-vue-fast/data/all.json";
// Import default CSS
import "emoji-mart-vue-fast/css/emoji-mart.css";

// Vue 2:
import { Emoji, Picker, EmojiIndex } from "emoji-mart-vue-fast";
// Vue 3, import components from `/src`:
// import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";

// Create emoji data index.
// We can change it (for example, filter by category) before passing to the component.
let emojiIndex = new EmojiIndex(data);

const i18n = {
  categories: {
    search: "搜索结果",
    recent: "经常使用",
    smileys: "心情",
    people: "人物",
    nature: "动物 & 大自然",
    foods: "食物 & 饮料",
    activity: "活动",
    places: "旅行 & 地标",
    objects: "物体",
    symbols: "符号",
    flags: "国旗",
    custom: "自定义",
  },
};

const indexI18n = new EmojiIndex(data, {
  exclude: [
    "flags",
    // "symbols",
    // "objects",
    // "activity",
    // "foods",
    // "people",
    // "places",
  ],
  // include: ["nature", "smileys", "recent"],
});

// import { wrapEmoji, emojiToHtml } from "@/utils/emoji.js";
export default {
  name: "App",
  components: {
    Picker,
    Emoji,
  },

  data() {
    return {
      emojiIndex: emojiIndex,
      emojisOutput: "",
      indexI18n: indexI18n,
      i18n: i18n,
    };
  },

  methods: {
    createNode(txt) {
      const template = `<div class='child'>${txt}</div>`;
      let tempNode = document.createElement("div");
      tempNode.innerHTML = template;
      return tempNode.firstChild;
    },
    showEmoji(emoji) {
      // this.emojisOutput = this.emojisOutput + emoji.native;
      // console.log(emoji.native);
      // console.log(wrapEmoji("12313" + emoji.colons + "q1eww2sdswq"));
      // let dom = this.createNode(
      //   wrapEmoji("12313" + emoji.colons + "q1eww2sdswq")
      // );
      // console.log(dom);
    },
  },
  computed: {
    santaEmojiObject() {
      return emojiIndex.findEmoji(":santa:");
    },
  },
};
</script>

<style>
.row {
  display: flex;
}
.row > * {
  margin: auto;
}
</style>