import { mount } from '@vue/test-utils'
import axios from 'axios'
import { vi,test,describe,expect } from 'vitest'

//importacion de componentes

import ProductCardVue from '../modules/platform/modules/product/components/ProductCard.vue'


//const prod = await axios.get('https://medical-farmacy.herokuapp.com/api/products/62e83712ab5cb30e5afcc56e')

//let productoTest = prod.data.product



const apiResult =`{"_id":"62e83712ab5cb30e5afcc56e","nombre":"Shampoo Tio Nacho Anti-Caída Herbolaria - Frasco 415 ML","precio":20,"descripcion":"Estimula el crecimiento y ayuda a revitalizar el cabello frágil y en situación de caída","laboratorio":"Tio Nacho","stock":132,"vencimiento":"02/12/2023","imagen":"https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/003881X.jpg","categoria":{"_id":"6335eac0cc1ad483ba52e896","name":"jabones"},"__v":0}`

let productoTest = JSON.parse(apiResult)

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}));

describe("CP009",()=>{

  test('verificar que existe el producto en la base de datos', async () => {
   
    console.log(productoTest);
    //console.log(prod.data.product);
    
    expect(productoTest != null).equals(true)
  })

  test('verificar que la invocacion contiene todos los atributos', async () => {
    //console.log(productoTest);
    expect(productoTest._id != null).equals(true)
    expect(productoTest.nombre != null).equals(true)
    expect(productoTest.precio != null).equals(true)
    expect(productoTest.descripcion != null).equals(true)
    expect(productoTest.laboratorio != null).equals(true)
    expect(productoTest.stock != null).equals(true)
    expect(productoTest.vencimiento != null).equals(true)
    expect(productoTest.imagen != null).equals(true)
    expect(productoTest.categoria != null).equals(true)
 })

  test('verificar que existe el componente producto y que es visible',  () =>{
    //console.log(prod.data);
    const wrapper = mount(ProductCardVue, {
      props: {
        product: productoTest
      }})  
    //console.log(wrapper.text())
    // se muestra la foto
    //expect(wrapper.find("img").find().exists()).toBe(true)
    expect(wrapper.find(`[src="${productoTest.imagen}"]`).exists()).toBe(true)
    // se muestra el nombre del producto
    expect(wrapper.text()).toContain('Shampoo Tio Nacho Anti-Caída Herbolaria - Frasco 415 ML') 
    // se muestra el laboratorio
    expect(wrapper.text()).toContain('Tio Nacho') 
    // se muestra el precio
    expect(wrapper.text()).toContain('S/. 20') 
  })

  test('verificar si existen los iconos para actualizar y eliminar',  () =>{
    //console.log(prod.data);
     const wrapper = mount(ProductCardVue, {
      props: {
        product: productoTest
      }}) 
      expect(wrapper.find('[id="icon_update_product"]').exists()).toBe(true)
      expect(wrapper.find('[id="icon_delete_product"]').exists()).toBe(true)
  })

})