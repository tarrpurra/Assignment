export default function DashboardMain() {
    return (
      <main className="flex-1 bg-white p-8">
        {/* Page Title */}
        <h2 className="text-2xl font-semibold text-center mb-10">Dashboard</h2>
  
        {/* Stat Boxes */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* Total Tickets */}
          <div className="w-60 h-72 bg-blue-500 rounded-md shadow-md flex flex-col items-center justify-center text-white font-bold">
            <span className="text-sm">Total Tickets</span>
            <span className="text-4xl mt-2">12</span>
          </div>
  
          {/* Total Solved */}
          <div className="w-60 h-72 bg-green-400 rounded-md shadow-md flex flex-col items-center justify-center text-white font-bold">
            <span className="text-sm">Total Solved</span>
            <span className="text-4xl mt-2">8</span>
          </div>
  
          {/* Total Awaiting Approval */}
          <div className="w-60 h-72 bg-red-400 rounded-md shadow-md flex flex-col items-center justify-center text-white font-bold">
            <span className="text-sm text-center px-2">Total Awaiting Approval</span>
            <span className="text-4xl mt-2">2</span>
          </div>
  
          {/* Total In Progress */}
          <div className="w-60 h-72 bg-yellow-300 rounded-md shadow-md flex flex-col items-center justify-center text-black font-bold">
            <span className="text-sm">Total in Progress</span>
            <span className="text-4xl mt-2">2</span>
          </div>
        </div>
      </main>
    );
  }
  