# Chef's Menu Manager

A mobile app that lets a chef plan a restaurant menu: add, edit, delete, search and filter dishes, and see simple menu statistics. 

## Features

- **Landing page** with logo, tagline and quick links to the main screens
- **Menu list** with search by dish name, course filter, live item count and an empty state
- **Add / Edit item** with inline validation, course and price fields, and a delete option (edit mode only)
- **Menu statistics** showing total items, average price and a bar for each course
- Shared menu state across all screens through React Context

## Tech stack

- React Native with Expo
- TypeScript
- React Navigation (native stack)
- `@react-native-picker/picker`
- `react-native-safe-area-context`

## Getting started

```bash
npm install
npx expo install @react-native-picker/picker react-native-safe-area-context react-native-screens
npm install @react-navigation/native @react-navigation/native-stack
npx expo start
```

## Project structure

```
chef_menu/
├── App.tsx                 # Navigation, MenuContext, sample data
├── assets/
│   └── logo.png            # Chef hat logo used on the landing page
└── components/
    ├── Landing.tsx         # Wireframe 1: Landing page
    ├── Home.tsx            # Wireframe 2: Menu list
    ├── edit.tsx            # Wireframe 3: Add / Edit menu item
    └── details.tsx         # Wireframe 4: Menu statistics
```

## Screens and navigation

| Screen    | Route     | Opens from                                   | Goes to                                  |
|-----------|-----------|----------------------------------------------|------------------------------------------|
| Landing   | `Landing` | App start                                    | Home, Edit, Details                      |
| Menu list | `Home`    | Landing, Statistics ("Back to Menu")         | Edit (add or edit), Details              |
| Add / Edit| `Edit`    | Landing, Home (add button, or tap a dish)    | Back to previous screen                  |
| Statistics| `Details` | Landing, Home                                | Home ("Back to Menu"), back              |

Add mode: `navigation.navigate("Edit")`
Edit mode: `navigation.navigate("Edit", { itemId: item.id })`

## Validation rules (Add / Edit screen)

- Dish name is required
- Description must be 12 characters or more
- Price must be a number greater than 0 (saved with two decimals, for example `85.00`)

Errors appear under each field after the first attempt to save.

---

# Change log

This log covers everything changed from the original code to the current version.

## Starting point (original code)

- `App.tsx`: `MenuContext`, a stack with two screens (`Home`, `Menu`) and three sample items
- `components/Home.tsx`: a simple list titled "My Menu" with a search box, item name and price, and an "Add Menu Item" button
- `components/Menu.tsx`: an "Add Menu Item" form with only a generic "Missing information" alert for validation
- `components/edit.tsx` and `components/details.tsx`: present in the project but not yet written

## Version 0.9 (current)

### Added

- **`components/edit.tsx`**: combined Add / Edit screen
  - Edit mode loads the item by `itemId` and updates it in place
  - Inline validation messages matching the wireframe wording
  - Course and Price shown side by side
  - Delete Item button, shown only in edit mode, with a confirmation prompt
- **`components/details.tsx`**: Menu Statistics screen
  - Total menu items and average price cards
  - "Items per Course" bars that update live
  - Back to Menu button
- **`components/Landing.tsx`**: landing page
  - Title, tagline and course line
  - View Menu, Add Menu Item and Menu Statistics buttons
  - Footer with version number
- **`assets/logo.png`**: chef hat logo, now used on the landing page in place of the emoji
- **Menu Statistics button on the Home screen**, linking to the statistics screen

### Changed

- **`App.tsx`**
  - Registered `Landing`, `Home`, `Edit` and `Details`, with `Landing` as the first screen
  - Replaced the sample data with the four wireframe dishes (Bobotie Springbok, Chakalaka Bites, Malva Pudding, Pea Soup)
- **`components/Home.tsx`** rebuilt to match the Menu List wireframe
  - Header with app name and subtitle, and a back button
  - Search box with a Clear button
  - Course filter picker
  - "N menu items shown" counter
  - Dish cards with a course badge, price and short description
  - Empty state message when nothing matches
  - Tapping a card opens it in Edit mode
  - "+ Add Menu Item" button now opens the Edit screen

### Fixed

- **Course name mismatch**: the sample data used `"Main Courses"` while the picker used `"Main Course"`, so those items never matched a filter or the statistics. Both now use `"Main Course"`.
- **Duplicate ids**: new items used `menuItems.length + 1` as an id, which can repeat after a deletion and break the list. They now use `Date.now()`.
- **Weak validation**: the old single "Missing information" alert was replaced with per-field checks, including a numeric price check.

### Removed

- **`components/Menu.tsx`**: replaced by `edit.tsx` and no longer used. It can be deleted from the project.

