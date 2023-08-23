import {createGlobalStyle} from "styled-components" 
export const darkTheme = {
  body: "#121212",
  textColor: "#f3f3f3",
  headingColor: "#f3f3f3",
  hover: "white",
}
export const lightTheme = {
  body: "#fff",
  textColor: "#120907",
  headingColor: "#120907",
  hover: "black",
}
export const GlobalStyles = createGlobalStyle`
 body {
  background: ${props => props.theme.body};
  color: ${props => props.theme.textColor};
  transition: .3s ease;
 }
 h2{
   color: ${props => props.theme.headingColor};
 }
`