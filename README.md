# React Native Projects

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine. You can download it [here](https://nodejs.org/).

## Getting Started

To get a local copy up and running, follow these steps:

### Installation

0. Clone the repository:
   ```bash
   git clone https://github.com/TheCoderAdi/react-native-projects.git
   ```
1. Navigate to the project directory:
   ```bash
   cd react-native-projects
   ```
2. Install the dependencies:
   ```bash
   npm i
   ```
3. Start the development server:
   ```bash
   npm run start
   ```

## StopWatch Features

- Start and stop the stopwatch
- Record laps
- Reset the stopwatch

## Tic Tac Toe Features

- Playable Tic Tac Toe game with a 3x3 grid
- Option to play against another player or the computer
- Display of game results (Winner or Draw)
- Restart the game with the option to select the mode again

## Calculator Features

- Functional calculator with basic arithmetic operations (addition, subtraction, multiplication, division)
- Percentage calculation and bracket handling
- Ability to toggle the sign of the current number
- Display of current input and result
- Clear button to reset the input

## QR Code Scanner Features

1. **Camera Permissions**:

   - Requests camera access permissions from the user to enable QR code scanning functionality.

2. **Toggle Camera Facing**:

   - Allows the user to switch between the front and back cameras for scanning.

3. **QR Code Scanning**:

   - Scans QR codes using the device's camera and decodes the encoded data.

4. **Display Scanned Data**:

   - Shows the decoded QR code data on the screen.

5. **Copy to Clipboard**:

   - Provides a button to copy the decoded QR code data to the clipboard.

6. **Open URL**:

   - If the scanned data is a valid URL, it offers a button to open the URL in the default web browser.

7. **Scan Again**:

   - Allows the user to reset the scanner and scan another QR code.

8. **Overlay Guide**:
   - Displays a visual guide (corners only) to help the user position the QR code correctly in the camera view.

## Todo App Features

1. **Add Todos**:

   - Allows the user to add new todos by entering text and pressing the add button.

2. **Edit Todos**:

   - Enables the user to edit existing todos by pressing the edit button and entering new text.

3. **Delete Todos**:

   - Provides a delete button to remove todos from the list.

4. **Empty State**:

   - Displays a message indicating that there are no todos when the list is empty.

5. **Scroll View**:

   - Enables scrolling through a list of todos if they exceed the screen height.

6. **User-Friendly Alerts**:

   - Alerts the user when trying to add an empty todo or when a todo has been copied to the clipboard.

7. **Persistent State**:
   - Maintains the current list of todos and text input state.
