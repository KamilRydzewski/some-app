<template>
  <q-card class="post-card bg-secondary text-white">
    <q-card-section class="column">
      <div class="row justify-between">
        <q-checkbox v-model="selected" />
        <q-chip class="q-ml-auto" clickable icon="bookmark">
          {{ number }}
        </q-chip>
      </div>
      <div class="text-h6">{{ title }}</div>
      <div class="text-subtitle2">{{ author }}</div>
    </q-card-section>
    <q-card-section>
      {{ content }}
    </q-card-section>
    <q-separator dark />
    <div class="text-subtitle2 q-pa-md">
      Created at:
      <span class="text-caption">{{ createdAt ? createdAt : ' - ' }}</span>
    </div>
    <q-card-actions>
      <q-btn
        :disable="disable"
        class="q-ml-auto"
        @click="$emit('on-delete')"
        flat
        >Delete</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'PostCard',
  props: {
    disable: {
      type: Boolean,
      defaulf: false,
    },
    number: {
      type: Number,
      defaulf: 0,
    },
    title: {
      type: String,
      default: 'Default Title',
    },
    createdAt: {
      type: [Date, String],
      default: undefined,
    },
    content: {
      type: String,
      default: 'Default Content',
    },
    author: {
      type: String,
      default: 'Default Author',
    },
  },
  setup(_, { emit }) {
    const selected = ref(false);

    watch(
      () => selected.value,
      () => {
        emit('on-select', selected.value);
      }
    );
    return { selected };
  },
});
</script>
