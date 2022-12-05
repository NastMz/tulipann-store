import {AnimatePresence, motion} from "framer-motion";
import {AiOutlineClose, BiShoppingBag} from "react-icons/all";
import {ShoppingCartCard} from "./ShoppingCartCard";
import {Link} from "react-router-dom";
import {routes} from "../routes/routes";
import {Ref} from "react";

interface ShoppingCartMobileProps {
    isShowingCart: boolean,
    toggleCart: Function,
    subtotal: number,
    cart: Array<any>,
    increaseProductCount: Function,
    decreaseProductCount: Function,
    removeProduct: Function

}
export const ShoppingCartMobile = (props: ShoppingCartMobileProps) => {
  return (
      <div
          className={`fixed inset-0 h-screen  w-full z-50 flex justify-center items-center px-2 lg:p-20 ${props.isShowingCart ? '' : 'pointer-events-none'}`}
      >
          <div
              className={`fixed inset-0 bg-black h-screen w-full ${props.isShowingCart ? 'opacity-50' : 'pointer-events-none opacity-0'}`}
              onClick={() => props.toggleCart()}
          />
          <AnimatePresence>
              {
                  props.isShowingCart && (
                      <motion.div
                          initial={{width: 0}}
                          animate={{width: '85%'}}
                          exit={{width: 0}}
                          className={`h-screen text-black fixed z-10 right-0 top-0 bottom-0 overflow-y-hidden transform origin-right bg-white overflow-x-hidden`}
                      >
                          <div className={`py-2 md:py-8 lg:py-1 px-1 md:px-8 lg:px-2 w-full h-full flex flex-col`}>
                              <div className={`flex items-center justify-between pr-2`}>
                                  <h4 className="px-4 py-3 font-medium text-xl flex-shrink">Bolsa</h4>
                                  <AiOutlineClose
                                      size={25}
                                      className={"cursor-pointer text-gray-400 hover:text-red-500"}
                                      onClick={() => props.toggleCart()}
                                  />
                              </div>
                              <div
                                  className={`px-3 md:px-5 flex-grow`}
                              >
                                  {
                                      props.cart.length > 0
                                          ?
                                          <div
                                              className={"min-h-full flex flex-col divide-y divide-solid divide-gray-200  overflow-y-auto"}>
                                              {
                                                  props.cart.map((product) => (
                                                      <ShoppingCartCard
                                                          id={product.id}
                                                          name={product.name}
                                                          price={product.price}
                                                          image={product.images[0]}
                                                          count={product.count}
                                                          increaseFunction={props.increaseProductCount}
                                                          decreaseFunction={props.decreaseProductCount}
                                                          removeProductFromCart={props.removeProduct}
                                                          key={product.id}
                                                          className={``}
                                                      />
                                                  ))
                                              }
                                          </div>

                                          :
                                          <div
                                              className={"flex flex-col items-center justify-center gap-6 text-gray-200 h-full"}>
                                              <BiShoppingBag size={80}/>
                                              <span
                                                  className={"text-xl text-center"}>No hay productos en la bolsa</span>
                                          </div>
                                  }
                              </div>
                              <div className={'flex-shrink h-fit'}>
                                  <div className={"flex justify-between px-4 pt-4 font-medium text-lg"}>
                                      <span className={""}>Subtotal</span>
                                      <span className={""}>${props.subtotal}</span>
                                  </div>
                                  <div className={"w-full h-fit my-4 flex justify-center"}>
                                      <Link
                                          to={routes.checkout.path}
                                          className={`mx-auto w-fit bg-red-500 text-white px-10 py-2 rounded-md hover:bg-red-400 font-medium ${props.cart.length > 0
                                              ? '' : 'pointer-events-none bg-gray-300'}`}
                                      >
                                          Ir a Pagar
                                      </Link>
                                  </div>
                              </div>
                          </div>
                      </motion.div>
                  )
              }
          </AnimatePresence>
      </div>
  )
}