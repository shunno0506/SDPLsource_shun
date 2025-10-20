// Analytics utilities for demo prototype
(function(){
  // Group by date (YYYY-MM-DD)
  function groupByDate(items){
    return items.reduce((m, it)=>{
      const k = it.date;
      if(!m[k]) m[k]=[];
      m[k].push(it);
      return m;
    },{});
  }

  function weekdayIndex(dateStr){
    // 0=Sun..6=Sat => map to ['日','月','火','水','木','金','土'] index
    const d = new Date(dateStr+'T00:00:00');
    return d.getDay();
  }

  function sumSalesByWeekday(sales){
    const sums = [0,0,0,0,0,0,0];
    sales.forEach(s=>{ sums[weekdayIndex(s.date)] += Number(s.amount)||0; });
    return sums; // Sun..Sat
  }

  function countReportsByWeekday(reports){
    const counts = [0,0,0,0,0,0,0];
    reports.forEach(r=>{ counts[weekdayIndex(r.date)] += 1; });
    return counts;
  }

  function sumSalesByPersonDay(sales){
    // if person info is not in sales, return totals only
    const total = sales.reduce((a,s)=>a + (Number(s.amount)||0), 0);
    const customers = sales.reduce((a,s)=>a + (Number(s.customers)||0), 0);
    return { total, customers };
  }

  function compareYoY(sales, date){
    // sales: [{date:'YYYY-MM-DD', amount:...}]
    // compare same month of last year
    const d = new Date(date+'T00:00:00');
    const month = d.getMonth();
    const year = d.getFullYear();
    const cur = sales.filter(s=>{
      const sd = new Date(s.date+'T00:00:00');
      return sd.getFullYear()===year && sd.getMonth()===month;
    });
    const prev = sales.filter(s=>{
      const sd = new Date(s.date+'T00:00:00');
      return sd.getFullYear()===year-1 && sd.getMonth()===month;
    });
    const sum = arr=>arr.reduce((a,s)=>a+(Number(s.amount)||0),0);
    return { current: sum(cur), prev: sum(prev) };
  }

  function groupReportsByEmployee(reports){
    const map = {};
    reports.forEach(r=>{
      const k = r.employeeId || 'N/A';
      if(!map[k]) map[k]=[];
      map[k].push(r);
    });
    return map;
  }

  window.appAnalytics = {
    groupByDate,
    weekdayIndex,
    sumSalesByWeekday,
    countReportsByWeekday,
    sumSalesByPersonDay,
    compareYoY,
    groupReportsByEmployee,
  };
})();
