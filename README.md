# Technical Assessment

## Description

Please, develop an application which creates a hierarchy table from input data in JSON format. Every item in JSON consists of its own data and array, which items represent child data. Item's data can have a variable number of attributes (key: value), and item can have a variable number of nested child items. When you click on an item, direct child items are hidden/shown.

There are two attachments in the email you were sent. In those, you can see an example of data in JSON and an example screenshot of the hierarchy table component. 

Use the attached “example-data.json” and create the hierarchy table application (similar to the screenshot). The application has data and view layers, which are clearly separated. Implement a "remove" button, which deletes an item in the data and view layer in your application. If an item has children items, they have to be deleted as well.


## Scope

* Usage of React.js/Vue/Angular
* Usage of state management of your choice
* Structure of medium-size production application
* Focus on performance, code quality, correct usage of chosen technologies, data consistency
* Design is not important
* (Optional) Write down known issues and what you would done different if you have more time


## Architecture

### General

For this app, I’ve used Create React App to make it easier and faster to start. Even though it's not already recommended. It could be built with Next.js framework for example, but my intention was to remain simple.

### Data Layer (src/data/)

* Responsible for loading data from a JSON file (`dataService.tsx`, using `%PUBLIC_URL%`).
* Defines the interface for data manipulation (`types.ts`).
* Contains the logic for transforming and managing data, including a function to remove items and their descendants (`removeNodeFromData` in `dataService.tsx`).
* Includes a function to add unique temporary IDs to each node (`addUniqueTempIds` in `dataService.tsx`) to handle recurring IDs.

### Presentation Layer (src/components/, src/App.tsx)

* It contains React components for rendering the user interface
* Uses component state (`useState`) to implement the logic for showing/hiding child items
* The main application logic and state management are in `App.tsx`.

With more time, I would implement a more responsive and mobile-friendly table.

## Technologies

* React.js
* TypeScript
* Tailwind CSS: A utility-first CSS framework for flexible styling directly in the HTML (JSX) code

## Components Structure

The following component structure was designed to display the hierarchical table:

* `App.tsx`: The main component responsible for fetching data, managing the application state (including the data and the remove node function), and rendering the `HierarchyTable`. It also displays the application title and the Koala42 logo.
* `HierarchyTable.tsx`: The primary component responsible for displaying the table for a particular level of the hierarchy.
* `TableHeader.tsx`: A component to display the table headers based on the keys of the data objects.
* `TableRow.tsx`: A component responsible for rendering a single row in the table. It displays the data for each item and includes the "Remove" button and the toggle button for showing and hiding child rows. It conditionally renders `NestedTable` for child items.
* `NestedTable.tsx`: A component that renders a nested table for the child items of a row. It receives the child data and renders `TableRow` components for them.

## Data Communication

Regarding the requirement for a medium-size production application structure, the data is loaded using `fetch` from data located in the `public` folder.

The data is then processed (unique IDs are added) and passed to the presentation layer (`App.tsx`) as state.

The `data` state and the `handleRemoveNode` function are passed down as props to the `HierarchyTable` component and further to its child components.

## Removing Items

The logic for removing items and their children is implemented in the data service layer (`removeNodeFromData` in `dataService.tsx`).

When the "Remove" button is clicked in the presentation layer (`TableRow`), the `onRemoveNode` prop (which points to the `handleRemoveNode` function in `App.tsx`) is called.

`handleRemoveNode` updates the application state by calling `removeNodeFromData` and setting the new data, which triggers a re-render of the UI.

## Problems during development

* There was a specific issue with the item that had the ID number 48, "Zaphod Beeblebrox". I needed to figure out the correct way for the application to handle its ID.
* I had some trouble figuring out how deep the tables were nested. This made them not look right.
* I changed how the code was split into different parts (components). This was because I was trying to find the best way to organize it.
* The "Remove" button functionality was initially broken due to incorrect passing of information (props) between components.