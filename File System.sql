WITH RecursiveCTE AS (
    SELECT 
        NodeID AS RootID,
        NodeID AS ChildID,
        SizeBytes
    FROM FileSystem
    UNION ALL
    SELECT 
        r.RootID,
        f.NodeID,
        f.SizeBytes
    FROM RecursiveCTE r
    JOIN FileSystem f ON f.ParentID = r.ChildID
)
SELECT 
    f.NodeID,
    f.NodeName,
    SUM(ISNULL(r.SizeBytes, 0)) AS SizeBytes
FROM FileSystem f
JOIN RecursiveCTE r ON f.NodeID = r.RootID
GROUP BY f.NodeID, f.NodeName
ORDER BY f.NodeID;
