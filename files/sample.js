
//   const fetchDatabases = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/databases');
//       const data = await response.json();
//       setDatabases(data.databases.map(db => db.replace('.db', '')));
//     } catch (error) {
//       console.error('Error fetching databases:', error);
//     }
//   };

//   const fetchTables = async (dbName) => {
//     try {
//       const response = await fetch(`http://localhost:8000/api/databases/${dbName}/tables`);
//       const data = await response.json();
//       setTables(data.tables.map(t => t.name));
//     } catch (error) {
//       console.error('Error fetching tables:', error);
//     }
//   };

//   const fetchTableData = async (dbName, tableName) => {
//     try {
//       const response = await fetch(`http://localhost:8000/api/databases/${dbName}/tables/${tableName}/metadata`);
//       const data = await response.json();
//       console.log(data)
//       setTableData(data.metadata);
//     } catch (error) {
//       console.error('Error fetching table data:', error);
//     }
//   };

//   const createDatabase = async () => {
//     try {
//       await fetch('http://localhost:8000/api/databases', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: newDbName })
//       });
//       setNewDbName('');
//       fetchDatabases();
//     } catch (error) {
//       console.error('Error creating database:', error);
//     }
//   };

//   const createTable = async () => {
//     const columns = [
//     {
//       "name": "id",
//       "type": "INTEGER",
//       "primaryKey": true,
//       "notNull": true
//     },
//     {
//       "name": "username",
//       "type": "TEXT",
//       "notNull": true
//     },
//     {
//       "name": "email",
//       "type": "TEXT"
//     },
//     {
//       "name": "created_at",
//       "type": "DATETIME"
//     }
//   ]
//     try {
//       await fetch(`http://localhost:8000/api/databases/gkm/tables`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           tableName: "mytable",
//           columns: columns
//         })
//       });
//       setShowCreateTable(false);
//       setNewTableData({
//         name: '',
//         columns: [{ name: '', type: 'TEXT', primaryKey: false, notNull: false }]
//       });
//       fetchTables(selectedDb);
//     } catch (error) {
//       console.error('Error creating table:', error);
//     }
//   };
