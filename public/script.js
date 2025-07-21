async function fetchData() {
  const res = await fetch('/api/files');
  return res.json();
}

function renderTree(data, parentId = null, container = document.getElementById("fileSystem")) {
  const children = data.filter(item => item.ParentID === parentId);
  children.forEach(node => {
    const div = document.createElement("div");
    div.textContent = node.NodeName;
    div.className = "node " + (node.SizeBytes === null ? "folder" : "file");
    div.draggable = true;
    div.dataset.id = node.NodeID;

    // Drag events
    div.ondragstart = (e) => {
      e.dataTransfer.setData("text/plain", node.NodeID);
    };

    div.ondragover = (e) => e.preventDefault();

    div.ondrop = async (e) => {
      e.preventDefault();
      const draggedId = parseInt(e.dataTransfer.getData("text/plain"));
      const newParentId = parseInt(e.currentTarget.dataset.id);

      await fetch('/api/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draggedId, newParentId })
      });

      location.reload();
    };

    container.appendChild(div);

    const childContainer = document.createElement('div');
    childContainer.className = 'tree';
    container.appendChild(childContainer);
    renderTree(data, node.NodeID, childContainer);
  });
}

fetchData().then(data => renderTree(data));
