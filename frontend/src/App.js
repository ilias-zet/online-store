import React, { useEffect, useState } from 'react'
import './App.css'
import HomePage from './pages/Home'
import Footer from './components/Footer'
import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import ProductsPage from './pages/Products'
import ProductPage from './pages/Product'
import Header from './components/Header'
import useSignUp from './customHooks/useSignUp'
import CategoriesPage from './pages/Categories'
import Authorization from './shared/Authorization'
import Cart from './pages/Cart'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme, GlobalStyles } from './shared/theme'

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  width: 100%;
  max-width: 1024px;
`

const Button = styled.div`
  cursor: pointer;
  transition: all 0.5s;
  bottom: ${({ scroll }) => (scroll ? '3rem' : '-10rem')};
  padding: 1rem 2rem;
  margin: 1rem;
  border-radius: 1rem;
  position: fixed;
  right: 5rem;
  transition: 0.2s all ease-in-out;
  background-color: rgb(0, 0, 0, 0.5);
  color: white;
  border: none;
  @media (max-width: 480px) {
    right: 1rem;
  }
`
const userInit = {
  name: '', // String
  surname: '', // String
  email: '', // String
  password: '', // String
  token: '', // String
  cart: [], // Array
}
const userLS = JSON.parse(localStorage.getItem('user'))
if (!userLS) {
  localStorage.setItem('user', JSON.stringify(userInit))
}
function App() {
  const [theme, setTheme] = useState('light')
  const { isOpened, open, close, isSignIn } = useSignUp(false)
  const [user, setUser] = useState(userInit)
  const [scroll, setScroll] = useState(0)
  const [isOpenedMenu, setIsopenedMenu] = useState(false)
  const handleScroll = () => {
    setScroll(window.scrollY)
    if (window.scrollY) {
      setScroll(true)
      setIsopenedMenu(false)
    }
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const switchTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Header
          open={open}
          user={user}
          setUser={setUser}
          userInit={userInit}
          isOpenedMenu={isOpenedMenu}
          setIsopenedMenu={setIsopenedMenu}
          theme={theme}
          switchTheme={switchTheme}
        ></Header>
        <OuterContainer>
          <Container>
            <Routes>
              <Route
                path='/'
                element={<HomePage user={user} setUser={setUser}></HomePage>}
              />
              <Route
                path='/products'
                element={<ProductsPage user={user} setUser={setUser} />}
              />
              <Route
                path='/categories'
                element={<CategoriesPage></CategoriesPage>}
              />
              <Route
                path='/cart'
                element={<Cart user={user} setUser={setUser}></Cart>}
              />
              <Route path='/products/:product_id' element={<ProductPage />} />
            </Routes>
            <Authorization
              isSignIn={isSignIn}
              isOpened={isOpened}
              close={close}
              setUser={setUser}
            ></Authorization>
            <Button scroll={scroll} onClick={() => window.scrollTo(0, 0)}>
              Go Up
            </Button>
          </Container>
        </OuterContainer>
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App
