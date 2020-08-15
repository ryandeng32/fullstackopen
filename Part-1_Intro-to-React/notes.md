# Part 1

## a. Intro to React

---

- Quickly set up React application with `**npx create-react-app`\*\*
- Run the application with **`npm start`**

**Components:**

- Names must be **capitalized**
- All content that needs to be rendered on screen is usually defined as **React Components**
- The component is defined as **a JavaScript function** (does not receive any parameters), and returns **JSX**
- We can render **dynamic content** inside of a component as well. `<p> { a + b } </p>`

**JSX:**

- HTML-like code that's compiled into JavaScript
- Compiling is handled by **Babel**
- Every tag needs to be closed

**Multiple Components:**

- A component can be called with its name in a tag, `<App />`
- Components can be called within components, even multiple times

**Props: passing data to components:**

- props are to components what **arguments are to functions**

## b. JavaScript

---

**Variables:**

```jsx
const x = 1; // defines a constant, value cannot be changed
let y = 5; // defines a normal variable

console.log(x, y); // 1, 5
y += 10;
console.log(x, y); // 1, 15
y = "sometext"; // variable type can change
console.log(x, y); // 1, sometext
x = 4; // error, because x is const
```

**Arrays:**

```jsx
const t = [1, -1, 3]
// contents of array can be modified even as a const
// the pointer to the array is constant but the array can change
t.push(5)

const t2 = t.concat(5) // creates new array [1, -1, 3, 5, 5]

console.log(t.length)  // 4
console.log(t[1])      // -1

// iterate through the array with for loop
t.forEach(value => {
	console.log(value)   // 1, -1, 3, 5 each to own line
}

// map
const t = [1,2,3]
const mt = t.map(value => value * 2)
console.log(m1)  // [2, 4, 6]

// destructuring assignment: assign items of an array easily to variables
const t = [1, 2, 3, 4, 5]
const [first, second ...rest] = t

console.log(first, second)   // 1, 2
console.log(rest)   // [3, 4, 5]
```

**Objects:**

```jsx
// define objects with object literals
// values of the properties can be any type
const object1 = {
  name: "John Doe",
  age: 35,
  education: "PhD",
  grades: [2, 3, 5, 3],
};

// reference the properties using "dot" notation
console.log(object1.name); // John Doe

// add properties using [] or .
object1["secret number"] = 1234;
object1.address = "Waterloo";
```

**Functions:**

```jsx
// arrow functions
const sum = (p1, p2) => {
  console.log(p1);
  console.log(p2);
  return p1 + p2;
};

const result = sum(1, 5);
console.log(result);

// exclude parentheses if there is only a single parameter
const square = (p) => {
  console.log(p);
  return p * p;
};

// when the function only contains a single expression, braces are not needed
const square = (p) => p * p;
```

## Component State, event handlers

---

**Component helper functions**

- helper functions inside component can access all props that are passed to the component

**Destructuring:**

- **a useful feature to destructure values from objects and arrays upon assignment**
- `const { name, age } = props`
- `const Hello = ({ name, age }) => {`

**Page re-rendering:**

- repeatedly calls a function with delay with `setInterval`
- However, repeatedly calling ReactDOM.render is not a good way to re-render components

**Stateful component**

- We can add state that **could change during the lifecycle of the component** with **React's `state hook`**
- `import { useState } from "react"`
- useState **returns a stateful value, and a function to update it**
  - `const [ counter, setCounter ] = useState(0)`
  - `counter` is assigned the initial value of state 0
  - `setCounter` is assigned to a function that will be used to modify the state
- When state modifying function is called, **React re-renders the component**, and the function body of the component gets **re-executed**

**Event handling**

- Registered to be called when specific events occur (e.g. clicking of a button)

```jsx
<button onClick={() => setCounter(counter + 1)}> plus </button>
```

**Event handler is a function!**

- An event handler is supposed to be either a **function** or **a function reference**

**Passing state to child components:**

- write React components that are small and reusable across the application and even across projects.

**Changes in state cause rerendering**

- useState hook create the application state
- calling a function which changes the state causes the component to rerender

## More complex state, debugging React apps

---

**complex state:**

- we can have multiple states by using the `useState` function multiple times

```jsx
const [left, setLeft] = useState(0);
const [right, setRight] = useState(0);
```

- Alternatively, we can group the states together

```jsx
const [clicks, setClicks] = useState({ left: 0, right: 0 });
```

- And event handlers like this, using the **object spread syntax ...**

```jsx
const handleLeftClick = () => {
  const newClick = {
    // spread operator
    ...clicks,
    left: clicks.left + 1,
  };
  setClicks(newClicks);
};
```

- **NOTES! we must change state using the state changing function, or else it won't cause rerendering**

**conditional rendering:**

- return different JSX based on conditionals

**Debugging React applications**

- First rule of web dev: keep the browser's developer console open at all times
- when we use `console.log`, don't combine objects by using the plus operator, instead use `,`

```jsx
console.log("props value is", props);
```

**Rules of Hooks**

- must not be called from inside of a loop, a conditional expression, or any place that's not a function defining a component. (To make sure the hooks are always called in the same order)

**Event Handling Revisited**

- we can use function that returns a function as event handler

```jsx
const hello = (who) => {
  const handler = () => {
    console.log("hello", who);
  };
  return handler;
};

return <button onClick={hello("world")}>button</button>;
```

- This can be utilized in defining generic functionality that can be customized with parameters

**Do not define components inside components:** provides no benefits and leads to problems
