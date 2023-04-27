import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount } from '@vue/test-utils';
import PostCard from '../../../src/components/molecules/PostCard.vue';

installQuasarPlugin();
describe('PostCard', () => {
  it('check if rendered default props', () => {
    const wrapper = mount(PostCard);
    const vm = wrapper.vm;
    expect(vm.content).toBe('Default Content');
    expect(vm.title).toBe('Default Title');
    expect(vm.author).toBe('Default Author');
    expect(vm.disable).toBeFalsy();
  });

  it('check if rendered custom props', async () => {
    const wrapper = mount(PostCard);
    const vm = wrapper.vm;
    await wrapper.setProps({
      content: 'Custom Content',
      title: 'Custom Title',
      author: 'Custom Author',
      disable: true,
    });
    expect(vm.content).toBe('Custom Content');
    expect(vm.title).toBe('Custom Title');
    expect(vm.author).toBe('Custom Author');
    expect(vm.disable).toBeTruthy();
  });
});
