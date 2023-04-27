<template>
  <q-page>
    <div class="row justify-center q-pa-md">
      <q-card class="col-xs-12 col-lg-6 col-xl-4">
        <PostForm
          :disable="loadingState"
          class="col-6"
          @on-submit="(e) => handleAddPost(e)"
        />
      </q-card>
    </div>
    <div class="row q-pa-md justify-end">
      <q-btn
        v-if="selectedPosts.length > 0"
        color="red-5"
        class="q-px-sm"
        icon-right="delete"
        label="delete all selected"
        @click="handleDeleteSelectedPost"
      />
    </div>
    <div class="row items-start q-col-gutter-x-md q-col-gutter-y-md q-pa-md">
      <template v-if="loadingState && posts.length < 1">
        <div class="col-12 row justify-center full-width">
          <CustomSpinner color="secondary" size="128" />
        </div>
      </template>
      <template v-else-if="!loadingState && posts.length > 0">
        <div
          class="col-xs-12 col-sm-6 col-lg-4"
          v-for="post in posts"
          :key="post.id"
        >
          <PostCard
            :number="post.id"
            :disable="loadingState && posts.length > 1"
            :title="post.title"
            :author="post.author"
            :content="post.content"
            :created-at="post.createdAt"
            @on-delete="handleDeletePost(post.id)"
            @on-select="(isSelected) => handleSelectPost(isSelected, post.id)"
          />
        </div>
      </template>
      <template v-else-if="!loadingState && posts.length < 1">
        <div class="col-12 column items-center full-width">
          <CustomIcon color="grey" name="subtitles_off" size="30em" />
          <div class="text-h6 text-grey">No results...</div>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script lang="ts">
import PostCard from 'src/components/molecules/PostCard.vue';
import { usePosts } from 'src/composables/usePosts';
import { defineComponent, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { Post } from 'src/types';
import PostForm from 'src/components/molecules/PostForm.vue';
import CustomIcon from 'src/components/atoms/CustomIcon.vue';
import CustomSpinner from 'src/components/atoms/CustomSpinner.vue';

export default defineComponent({
  name: 'ListPage',
  components: { PostCard, PostForm, CustomIcon, CustomSpinner },
  setup() {
    const { getAllPosts, posts, deletePost, createNewPost } = usePosts();
    const loadingState = ref(false);
    const selectedPosts = ref<number[]>([]);
    onMounted(async () => {
      try {
        loadingState.value = true;
        await new Promise((r) => setTimeout(r, 2000));
        await getAllPosts();
      } catch (e) {
        console.error(e);
      } finally {
        loadingState.value = false;
      }
    });
    const $q = useQuasar();

    const handleAddPost = async (data: Post) => {
      const notif = $q.notify({
        type: 'ongoing',
        message: 'Adding post...',
      });
      try {
        loadingState.value = true;
        await createNewPost(data);
        notif({
          type: 'positive',
          message: 'Post created',
        });
        await getAllPosts();
      } catch (e) {
        console.error(e);
        notif({
          type: 'negative',
          message: 'Error while adding post',
        });
      } finally {
        loadingState.value = false;
      }
    };

    const handleDeletePost = async (id?: number) => {
      if (!id) return;
      const notif = $q.notify({
        type: 'ongoing',
        message: 'Deleting post...',
      });
      try {
        loadingState.value = true;
        const resp = await deletePost(id);
        notif({
          type: 'positive',
          message: resp.message,
        });
        await getAllPosts();
      } catch (e) {
        console.error(e);
        notif({
          type: 'negative',
          message: 'Error while deleting post',
        });
      } finally {
        loadingState.value = false;
      }
    };

    const handleSelectPost = (isSelected: boolean, id = 0) => {
      if (isSelected) {
        selectedPosts.value = [...selectedPosts.value, id];
      } else {
        selectedPosts.value = selectedPosts.value.filter(
          (selectedId) => selectedId != id
        );
      }
    };

    const handleDeleteSelectedPost = async () => {
      const promises = selectedPosts.value.map((id) => deletePost(id));
      const notif = $q.notify({
        type: 'ongoing',
        message: 'Deleting selected posts...',
      });
      try {
        loadingState.value = true;
        await Promise.all(promises);
        //here we can also notify user which one ids were deleted in this notification
        notif({
          type: 'positive',
          message: 'Posts deleted',
        });
      } catch (e) {
        console.error(e);
        notif({
          type: 'positive',
          message: 'Problem while deleting posts',
        });
      } finally {
        selectedPosts.value = [];
        await getAllPosts();
        loadingState.value = false;
      }
    };

    return {
      handleDeleteSelectedPost,
      handleSelectPost,
      selectedPosts,
      posts,
      handleDeletePost,
      loadingState,
      handleAddPost,
    };
  },
});
</script>
