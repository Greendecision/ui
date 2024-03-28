# Custom Hooks

A series of custom hooks used in various projects by [Greendecision](https://www.greendecision.eu/wp/)
- [Custom Hooks](#custom-hooks)
  - [EditableTypography](#editabletypography)

## EditableTypography

A `useState` like hook, that under the hood saves the value with the browser cookies API.

**Params**

- key: key used by the browser to store the value
- defaultValue: initial value
- options: object of Cookies.CookieAttributes. Some default options are passed (sameSite: "Strict", secure: true)

**Returns**
`[value, updateValue, deleteValue]`
