# Health Questionnaire Management System

A modern health questionnaire management system built with Vue 3, TypeScript, and Pinia. This application provides a comprehensive solution for creating, managing, and previewing health-related questionnaires with multiple question types.

## ✨ Features

- **Questionnaire Management**: Create, edit, and delete health questionnaires
- **Multiple Question Types**:
  - Radio buttons (single choice)
  - Checkboxes (multiple choice)
  - Text input (open-ended questions)
- **Dynamic Question Builder**: Add and manage questions with customizable options
- **Modern Admin Dashboard**: Clean and intuitive interface with TailAdmin design
- **Responsive Layout**: Collapsible sidebar and mobile-friendly design
- **State Management**: Centralized state management with Pinia
- **Type Safety**: Full TypeScript support for robust development

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Scoped CSS with modern design patterns

## 📦 Project Structure

```
src/
├── components/
│   ├── common/          # Shared components (Navbar, Sidebar)
│   └── question/        # Question-related components
├── views/               # Page components
│   ├── Management.vue   # Questionnaire list and management
│   └── Preview.vue      # Questionnaire preview
├── stores/              # Pinia state management
│   └── questionListStore.ts
├── router/              # Vue Router configuration
└── assets/              # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd vue3-ts-temp
```

1. Install dependencies:

```bash
npm install
```

1. Run development server:

```bash
npm run dev
```

1. Build for production:

```bash
npm run build
```

## 📝 Usage

### Creating a Questionnaire

1. Navigate to the Management page
2. Click "建立問卷" (Create Questionnaire)
3. Fill in the questionnaire title and description
4. Set the status (Active/Inactive)
5. Add questions using the question builder
6. Save the questionnaire

### Question Types

- **Radio (單選)**: Single choice questions with multiple options
- **Checkbox (多選)**: Multiple choice questions allowing multiple selections
- **Text (問答)**: Open-ended text input questions

### Managing Questions

- Add new options to radio/checkbox questions
- Remove options (minimum one option required)
- Mark questions as required or optional
- Delete questions from questionnaires

## 🎨 Design Features

- **Modern UI**: Clean and professional interface
- **Color-coded Status**: Visual indicators for active/inactive questionnaires
- **Interactive Components**: Smooth transitions and hover effects
- **Modal Dialogs**: User-friendly question creation interface

## �‍💻 Development Team

### Core Developer

#### 孫于喬 (YuChiaoSun, Joy)

- Role: Full Stack Developer
- GitHub: [@suj811014](https://github.com/suj811014)

## 📧 Contact

If you have any questions or suggestions, feel free to reach out:

- Technical Support: suj811014@gmail.com

## �📄 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
