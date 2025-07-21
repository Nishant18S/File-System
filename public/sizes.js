async function loadFolderSizes() {
  const res = await fetch('/api/folder-sizes');
  const data = await res.json();

  const tbody = document.querySelector('#sizeTable tbody');
  data.forEach(item => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.NodeID}</td>
      <td>${item.NodeName}</td>
      <td>${item.SizeBytes}</td>
    `;

    tbody.appendChild(row);
  });
}

loadFolderSizes();
