import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount } from '@vue/test-utils';
import CustomIcon from '../../../src/components/atoms/CustomIcon.vue'

installQuasarPlugin();

describe('CustomIcon', () => {
  it('check if rendered', () => {
    const wrapper = mount(CustomIcon);    
    expect(wrapper.find('.custom-icon')).toBeDefined();
  });
});
