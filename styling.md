# Formatting/Naming convention

### Naming:
##### variables/functions: 
  camelCase
* if component: 
  UpperCase
##### folders: 
  lower_case 
* if component: 
  UpperCase
##### branches: 
  kebab-case

### Formatting:
##### React Component:
```
const CompName = (parameters) => {                   // component names and props/parameters to be used
  const [var, func] = React.useState(initialState);  // declare state using hooks if necessary, var will be set to initialState and can be updated with func
  const otherFunction(input){                        // declare other necessary functions for component
    // code to do something
   };
   return (                                          // start JSX syntax, this is basically HTML using JavaScript; return will render the component
    <div>
      <p>Hello, World!</p>
    </div>
   )
}
```
##### Styling:
As opposed to CSS, we will use the styled-components library to include CSS directly into our JavaScript files
```
const Container = styled.div`                       // can use this syntax to restyle HTML elements, then can call <Container/> in React components
  color: black;                                     // these are normal CSS properties and follow CSS syntax
  width: 100%;
  height: 100vh;
`
```
