import React, { useState } from 'react';
import { Search, FileSpreadsheet, Download, Filter } from 'lucide-react';

const GradebookPage = ({ students, allGrades }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const subjects = [
    "Design and Analysis of Algorithms",
    "Operating Systems",
    "Database Management Systems",
    "Computer Organization and Architecture",
    "Software Engineering",
    "Microprocessors"
  ];

  // Helper to map subjects to short codes for table headers
  const getCode = (s) => {
    const map = {
        "Design and Analysis of Algorithms": "DAA",
        "Operating Systems": "OS",
        "Database Management Systems": "DBMS",
        "Computer Organization and Architecture": "COA",
        "Software Engineering": "SE",
        "Microprocessors": "MP"
    };
    return map[s] || s;
  }

  const pivotData = students.map(student => {
     const studentGrades = allGrades.filter(g => (g.studentId?._id || g.studentId) === student._id);
     const row = {
         student,
         grades: {},
         total: 0,
         count: 0
     };
     subjects.forEach(sub => {
         const match = studentGrades.find(g => g.subject === sub);
         row.grades[sub] = match ? match.marks : '-';
         if (match) {
             row.total += match.marks;
             row.count++;
         }
     });
     row.average = row.count > 0 ? (row.total / row.count).toFixed(1) : '0';
     return row;
  });

  const filteredData = pivotData.filter(row => 
     row.student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     row.student.rollNo?.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.student.name.localeCompare(b.student.name, undefined, { numeric: true, sensitivity: 'base' }));

const handleExportCSV = () => {
    const headers = ["Student Name", "Roll No", ...subjects, "Average %"];
    const rows = filteredData.map(row => [
      row.student.name,
      row.student.rollNo || 'N/A',
      ...subjects.map(s => row.grades[s]),
      row.average
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Gradebook_Summary_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Gradebook Summary</h1>
          <p className="text-gray-500 mt-1">Institutional overview of all student performance metrics.</p>
        </div>

        <div className="flex items-center space-x-4">
           <div className="relative w-full md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search roll no or name..." 
                className="input-field pl-11 h-11 w-full text-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button 
              onClick={handleExportCSV}
              className="btn bg-white border border-gray-200 text-gray-700 h-11 px-4 hover:bg-gray-50 flex items-center space-x-2 rounded-xl text-sm font-bold shadow-sm"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export CSV</span>
           </button>
        </div>
      </header>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-5 font-black text-gray-400 uppercase tracking-widest sticky left-0 bg-gray-50 z-20">Student Identity</th>
                <th className="px-6 py-5 font-black text-gray-400 uppercase tracking-widest text-center">Roll No</th>
                {subjects.map(s => (
                   <th key={s} className="px-4 py-5 font-black text-gray-400 uppercase tracking-widest text-center" title={s}>
                      {getCode(s)}
                   </th>
                ))}
                <th className="px-6 py-5 font-black text-primary-600 uppercase tracking-widest text-center bg-primary-50">GPA Avg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-bold">
              {filteredData.map((row) => (
                <tr key={row.student._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5 sticky left-0 bg-white group-hover:bg-gray-50 transition-colors z-10 border-r border-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary-100 group-hover:text-primary-600 transition-all">
                        <FileSpreadsheet className="h-4 w-4" />
                      </div>
                      <span className="text-gray-900">{row.student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center text-gray-500 font-black">
                    {row.student.rollNo || 'N/A'}
                  </td>
                  {subjects.map(s => (
                    <td key={s} className={`px-4 py-5 text-center ${row.grades[s] === '-' ? 'text-gray-200' : 'text-gray-700'}`}>
                      {row.grades[s]}
                    </td>
                  ))}
                  <td className="px-6 py-5 text-center bg-primary-50/30 text-primary-700 font-black">
                     {row.average}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="p-8 bg-primary-600 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-primary-200">
         <div className="space-y-1 mb-6 md:mb-0">
            <h4 className="text-xl font-black">Batch Analytics Ready</h4>
            <p className="text-primary-100 text-sm">Full student records are updated in real-time. Use the export CSV for offline archiving.</p>
         </div>
         <button 
           onClick={handleExportCSV}
           className="w-full md:w-auto px-10 py-4 bg-white text-primary-600 rounded-2xl font-black text-sm hover:bg-primary-50 transition-all shadow-xl"
         >
            Download Batch Report
         </button>
      </div>
    </div>
  );
};

export default GradebookPage;
