# Zocket Canvas

Zocket Canvas is a customizable ad canvas generator built using React. It allows users to create personalized ad banners by customizing various elements such as text, images, colors, and more.

## Features

- **Customizable Ad Content**: Edit text fields to update ad content. Upload custom images for the main content and logo.
- **Background Color Selection**: Choose background colors to match branding or design preferences. Recent colors are displayed for quick selection.
- **Real-time Preview**: Preview the customized ad canvas in real-time.
- **Downloadable Images**: Download the generated ad canvas as an image file.

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/Soumik-Abir/zocket_canvas.git
```

2. Navigate to the project directory:

```bash
cd zocket_canvas
```

3. Install dependencies using npm:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

5. Open your web browser and go to `http://localhost:3000` to view the application.

## Technology Stack

- **React**: A JavaScript library for building user interfaces.
- **React Vite** : A fast development server and build tool for modern web development with React.
- **Tailwind CSS** : A utility-first CSS framework for creating custom designs without having to leave your HTML.
- **Flowbite**: A UI component library for React, used for styling buttons.
- **React Icons**: Provides a set of beautiful icons for React applications.
- **React Color**: A color picker component for React applications.

## Components

### CanvasView

The `CanvasView` component renders the ad canvas based on the provided content and styling. It utilizes the HTML5 `<canvas>` element to draw images and text onto the canvas.

### FileInputWrapper

The `FileInputWrapper` component provides a file input field for uploading images. It allows users to select images from their local file system to be used as content or logo in the ad canvas.

### TextInputWrapper

The `TextInputWrapper` component renders a text input field with an optional icon. It is used for entering and updating text content in the ad canvas.

### ColorPickerSection

The `ColorPickerSection` component allows users to select background colors for the ad canvas. It displays a list of recent colors for quick selection and provides a color picker interface for choosing custom colors.

### ColorPicker

The `ColorPicker` component is a reusable color picker interface powered by React Color. It enables users to choose colors with various options like opacity control.

### CanvasEdit

The `CanvasEdit` module is a utility class used by the `CanvasView` component to handle drawing operations on the canvas. It provides methods for drawing background colors, images, and text onto the canvas.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
