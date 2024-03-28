<template>
  <div id="emoji-picker-wrap" v-show="visibility">
    <Picker
      :showPreview="false"
      :data="indexI18n"
      :i18n="i18n"
      set="twitter"
      @select="showEmoji"
      :emojiSize="20"
      :perLine="10"
      :showSearch="false"
      :infiniteScroll="false"
    />
    <div class="">
      <!-- <emoji :data="emojiIndex" emoji=":santa::skin-tone-3:" :size="32" />
      <emoji :data="emojiIndex" emoji="santa" set="twitter" :size="32" />
      <emoji :data="emojiIndex" :emoji="santaEmojiObject" :size="32" /> -->
    </div>
  </div>
</template>

<script>
import data from "emoji-mart-vue-fast/data/google.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";

import { Emoji, Picker, EmojiIndex } from "emoji-mart-vue-fast";

const i18n = {
  categories: {
    search: "搜索结果",
    recent: "最近使用",
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
  exclude: ["flags"],
});

export default {
  name: "EmojiPicker",
  props: {
    visibility: { type: Boolean, default: false },
  },
  components: {
    Picker,
    Emoji,
  },
  data() {
    return {
      indexI18n: indexI18n,
      i18n: i18n,
    };
  },

  methods: {
    // async canRenderEmoji(emoji) {
    //   const encodedEmoji = encodeURIComponent(emoji);
    //   const url = `https://emojipedia.org/${encodedEmoji}/`;

    //   try {
    //     const response = await fetch(url, { mode: "no-cors" });

    //     if (response.status !== 200) {
    //       throw new Error(`Failed to load ${url}: status ${response.status}`);
    //     }

    //     const text = await response.text();
    //     return !text.includes("Image not available");
    //   } catch (err) {
    //     console.error(err);
    //     return false;
    //   }
    // },
    async showEmoji(emoji) {
      //这个🫠每一都不一样，还有其它的，找不到判断方法
      if (
        emoji.native === "🫠" ||
        emoji.native === "🥲" ||
        emoji.native === "🥲" ||
        emoji.native === "🫢" ||
        emoji.native === "🫴"
      ) {
        this.$message.error("该表情暂不支持");
        return false;
      } else {
        this.$emit("receiveEmoji", emoji.native);
      }
    },
  },
  computed: {
    santaEmojiObject() {
      //   return emojiIndex.findEmoji(":santa:");
    },
  },
};
</script>

<style lang="less" scoped>
#emoji-picker-wrap {
  /deep/ .emoji-mart {
    height: 300px;
  }
}
</style>