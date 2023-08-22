import {createGlobalStyle} from "styled-components" 
export const darkTheme = {
  body: "#000",
  textColor: "#fff",
  headingColor: "lightblue",
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