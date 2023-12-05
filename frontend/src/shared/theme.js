import {createGlobalStyle} from "styled-components" 
export const darkTheme = {
  body: "#111415",
  textColor: "#f3f3f3",
  headingColor: "#f3f3f3",
  hover: "white",
}
export const lightTheme = {
  body: "#f9f9f9",
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