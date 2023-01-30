import React, { useEffect, createContext, useContext, useState } from 'react'
import { addToCart } from '../redux/actions/cartActions'
import { useDispatch } from 'react-redux'

const StateContext = createContext()

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
}

export const ContextProvider = ({ children }) => {
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [screenSize, setScreenSize] = useState(undefined)
  const [currentColor, setCurrentColor] = useState('#03C9D7')
  const [currentMode, setCurrentMode] = useState(
    localStorage.getItem('themeMode') || 'Light'
  )
  const [checked, setChecked] = useState(currentMode === 'Dark')

  const [themeSettings, setThemeSettings] = useState(false)
  const [activeMenu, setActiveMenu] = useState(false)
  const [isClicked, setIsClicked] = useState(initialState)

  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1)

  const incQty = () => {
    setQty((prevQty) => prevQty + 1)
  }

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1

      return prevQty - 1
    })
  }

  // Add to cart in productlist
  const [qtyById, setQtyById] = useState({})
  const dispatch = useDispatch()
  const handlerAddToCart = (id) => {
    const newQtyById = { ...qtyById }
    newQtyById[id] = (newQtyById[id] || 0) + 1
    setQtyById(newQtyById)
    dispatch(addToCart(id, newQtyById[id]))
  }

  // Add to cart in productDetails and incQty in cartScreen
  const handlerAddToCartDetail = (id) => {
    const newQtyById = { ...qtyById }
    newQtyById[id] = (newQtyById[id] || 0) + qty
    setQtyById(newQtyById)
    dispatch(addToCart(id, newQtyById[id]))
  }
  // cart items

  useEffect(() => {
    localStorage.setItem('themeMode', currentMode)
  }, [currentMode])

  useEffect(() => {
    window.addEventListener('storage', (e) => {
      if (e.key === 'themeMode') {
        setCurrentMode(e.newValue)
        setChecked(e.newValue === 'Dark')
      }
    })
  }, [])

  const setColor = (color) => {
    setCurrentColor(color)
    localStorage.setItem('colorMode', color)
  }

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true })

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        handlerAddToCartDetail,
        qtyById,
        setQtyById,
        handlerAddToCart,
        checked,
        setChecked,
        setQty,
        qty,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        cartItems,
        setCartItems,
        loading,
        setLoading,
        modal,
        setModal,
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setColor,
        themeSettings,
        setThemeSettings,
        incQty,
        decQty,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
