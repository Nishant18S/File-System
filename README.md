# 📁 File System Explorer (Drag-and-Drop + Folder Size Report)

This project is a simple yet powerful **web-based file system explorer** built with:

- 🔧 **Node.js (Express)**
- 🗃️ **SQL Server (SSMS)**
- 🎨 **HTML + CSS + Vanilla JavaScript**

It supports:
- ✅ Drag-and-drop folder hierarchy management
- ✅ Recursive folder size calculation
- ✅ Live visual folder structure
- ✅ Modern animated UI

---

## 🌐 Live Demo

> Coming soon... (or you can run it locally — see below)

---

## 📦 Features

| Feature                          | Description |
|----------------------------------|-------------|
| 🔁 Drag and drop                | Move files and folders in a tree |
| 📊 Folder size calculation     | Recursively totals file sizes |
| 🧮 SQL Server backend           | Fast CTE-based hierarchy queries |
| 💡 Animated UI                  | Smooth CSS transitions and hover |
| 💻 Modern layout                | Mobile-friendly and responsive |
| ⚙️ Clean structure              | Easy to extend with create, rename, delete |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/)
- [SQL Server 2022 Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [SQL Server Management Studio (SSMS)](https://aka.ms/ssmsfullsetup)

### 🗃️ Setup SQL Database

In SSMS:

```sql
CREATE DATABASE Employee;
GO
USE Employee;

CREATE TABLE FileSystem (
  NodeID INT PRIMARY KEY IDENTITY(1,1),
  NodeName VARCHAR(100),
  ParentID INT NULL,
  SizeBytes INT NULL
);

INSERT INTO FileSystem (NodeName, ParentID, SizeBytes) VALUES
('Documents', NULL, NULL),
('Pictures', NULL, NULL),
('File1.txt', 1, 500),
('Folder1', 1, NULL),
('Images.jpg', 2, 1200),
('Subfolder1', 4, NULL),
('File2.txt', 4, 750),
('File3.txt', 6, 300),
('Folder2', 2, NULL),
('File4.txt', 9, 250);
```

### ⚙️ Setup Node.js Backend

1. Clone this repo:
   ```bash
   git clone https://github.com/yourusername/file-system-explorer.git
   cd file-system-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Edit `db.js` with your SQL credentials:
   ```js
   const config = {
     user: 'nodeuser',
     password: 'YourPassword',
     server: 'localhost',
     port: 1433,
     database: 'Employee',
     options: {
       encrypt: false,
       trustServerCertificate: true
     }
   };
   ```

4. Start the server:
   ```bash
   node server.js
   ```

5. Open your browser:
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
project-root/
├── public/
│   ├── index.html       # Folder size report
│   ├── sizes.js         # JavaScript to fetch data
│   ├── drag.html        # (Optional) drag-and-drop UI
│   └── script.js        # drag-and-drop logic
├── server.js            # Express backend routes
├── db.js                # SQL Server DB connection
├── package.json
└── README.md
```

---

## 🎨 Screenshots

> _(Insert screenshots here showing folder size table and drag-drop tree UI)_

---

## ✅ Future Improvements

- [ ] Create/Rename/Delete nodes
- [ ] Upload real files (via disk or cloud)
- [ ] User authentication
- [ ] Export size report to CSV
- [ ] Deploy on Render/Railway/Glitch

---

## ✅ Output
---
<img width="1918" height="1072" alt="Screenshot 2025-07-22 000137" src="https://github.com/user-attachments/assets/5b0e633e-01d2-4d34-801c-cc8869477e44" />

<img width="1918" height="1078" alt="Screenshot 2025-07-21 235322" src="https://github.com/user-attachments/assets/8ba70681-0ef5-4719-83ef-6638e9e620f5" />

<img width="1918" height="1078" alt="Screenshot 2025-07-21 235401" src="https://github.com/user-attachments/assets/fa7c248f-43d9-4286-b8af-b4da2a9bfda0" />

<img width="1913" height="1027" alt="Screenshot 2025-07-21 235224" src="https://github.com/user-attachments/assets/360f1e3a-b18e-46cd-9b41-e7ba47269f06" />

<img width="1918" height="1030" alt="Screenshot 2025-07-22 000535" src="https://github.com/user-attachments/assets/c2cb4cd4-69c1-4b2f-860e-097c1962de46" />

<img width="1918" height="1032" alt="Screenshot 2025-07-22 000652" src="https://github.com/user-attachments/assets/c4324a53-791e-415e-802e-7d36d81ef5de" />

---

## 📄 License

MIT License © 2025 [Nishant Sankar Swain](https://github.com/Nishant18S)
