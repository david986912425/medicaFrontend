import { flushPromises, mount } from "@vue/test-utils";
import router from '../router/router'
import  App  from "../App.vue";
import { vi,describe ,test,fn,expect} from "vitest";
import { createTestingPinia } from '@pinia/testing'

describe('App',() =>{
  describe('routes',() =>{
    test('navigate',async ()=>{
      router.push('');
      await router.isReady();

      const wrapper = mount(App,{
        global:{
          plugins:[router,createTestingPinia({
            stubActions:false,
            createSpy: vi.fn()
          })]
        }
      });
      
      await wrapper.find('input[type="text"]').setValue('christian@test.com')
      await flushPromises()
     // expect(wrapper.find('input[name="user"]').text()).toBe('a')
      //await wrapper.find('input[name="password"]').setValue('christian')
      //await wrapper.find('button').trigger('click')
      //expect(wrapper.find('button[.action__login]').exists()).toBe(true)
      
      console.log(wrapper.find('input[name="user"]').html());
    })
  })
})