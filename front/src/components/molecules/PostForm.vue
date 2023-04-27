<template>
  <div class="q-pa-md">
    <q-form
      @reset="onReset"
      @submit="$emit('on-submit', { author, title, content })"
      class="q-gutter-md"
    >
      <q-input
        filled
        :disable="disable"
        v-model="author"
        label="Author"
        hint="Name and surname"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        :disable="disable"
        v-model="title"
        label="Title"
        hint="Post Title"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        :disable="disable"
        filled
        v-model="content"
        type="textarea"
        label="Content"
        hint="Post description"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div class="row justify-end">
        <q-btn
          :disable="disable"
          label="Submit"
          type="submit"
          color="secondary"
        />
        <q-btn
          :disable="disable"
          label="Reset"
          type="reset"
          color="secondary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PostForm',
  props: {
    disable: {
      type: Boolean,
      default: () => false,
    },
  },
  setup() {
    const author = ref(null);
    const title = ref(null);
    const content = ref(null);
    const accept = ref(false);

    const onReset = () => {
      author.value = null;
      content.value = null;
      title.value = null;
    };
    return {
      author,
      title,
      content,
      accept,
      onReset,
    };
  },
});
</script>
