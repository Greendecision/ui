# Greendecision UI

A series of custom ui components used in various projects by [Greendecision](https://www.greendecision.eu/wp/)
- [Greendecision UI](#greendecision-ui)
  - [Installation](#installation)
  - [Publish](#publish)
  - [Testing](#testing)
  - [Components](#components)
    - [EditableTypography](#editabletypography)
    - [ConfirmButton](#confirmbutton)
    - [Shortcuts](#shortcuts)

## Installation

To initialize the project, run:

```bash
npm install
```

## Publish

To publish a new version of this package, you need to make sure the git branch is clean and everything is commited. Then run:

```bash
# choose either patch, minor or major (without the brackets)
npm version [patch|minor|major]
```

This will run automatically the tests and if they pass, it will create a new version of the package. Then you can push the changes to the repository:

```bash
git push
```

And finally, publish the package to npm:

```bash
npm run publish
```

## Testing

_todo_


## Components

### EditableTypography

A component that allows the user to edit the text by clicking on it. It is based on the Material-UI Typography component.

**Info**
When in edit mode, the changes are saved when hitting the ```enter``` button. But, if the ```multiline``` option is set to true, then the changes are saved when hitting the ```ctrl + enter``` buttons. 

**Params**

```typescript
text: string; // the text to be displayed
variant: Variant; // the variant of the Typography component
onChange?: (newText: string) => void; // callback function that is called when the text is changed
onDelete?: () => void; // callback function that is called when the text is deleted
width?: number; // the width of the component
multiline?: number; // if the text can be multiline
loading?: boolean; // if the component is loading
isNotEditable?: boolean; // if the component is not editable
inputType?: "string" | "number"; // the type of the input
url?: string; // the url to redirect to when the text is clicked
placeHolder?: string; // the placeholder of the input, shown in italic when the text is empty
  ```

### ConfirmButton

A button based on the Material-UI Button component, that requires a confirmation before executing the action.

The confirmation is achieved with a double click, the first click will change the button text and the second click will execute the action.



**Params**

```typescript
confirmAction: () => void; // action to be executed when the button is clicked twice
confirmText?: string; // default: "Confirm?"
firstClickCallback?: () => void; // called when the button is clicked once, can be used to display other warnings.
[...ButtonProps] // all the other props of the Material-UI Button component
```

### Shortcuts

A component that can be used to set a shortcut in a page. 
For example, if you want to set a shortcut to open the bookmarks, you can use the following code:

```tsx
const [open, setOpen] = useState(false);

return <div>
  <Shortcuts button="b" onShortcutCalled={() => setOpen((prev) => !prev)} ctrl={true} />
  <Bookmarks open={open} onClose={() => setOpen(false)} />
</div>
```

In this example, when the user presses ```Ctrl + B```, the Bookmarks component will open.

The showHint prop can be used to show a hint to the user about the shortcut. The hint shows just the button and the keys that need to be pressed.

```typescript
button: string; // key to be pressed for the shortcut
onShortcutCalled?: () => void; // function to be called when the shortcut is pressed
ctrl: boolean; // if Ctrl key is part of the shortcut
shift: boolean; // if Shift key is part of the shortcut
showHint?: boolean; // if the hint should be shown, if true, it shows it though the ShortcutHint component
hintOnly?: boolean; // if the hint should be shown only, if true, it shows it though the ShortcutHint component and does not set the event listener
```

In some cases, we want to set a shortcut in a component and show the hint in another component. For example, we want to set a shortcut to open the bookmarks, but we want to show the hint in the header. In this case, we can use the hintOnly prop to show the hint only in the header.

