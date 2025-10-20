// Local storage layer for demo prototype
// Keys: 'reports', 'sales'
(function(){
  const KEYS = { reports: 'reports', sales: 'sales' };

  function _loadArray(key){
    try{
      const raw = localStorage.getItem(key);
      if(!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    }catch(e){ return []; }
  }
  function _saveArray(key, arr){
    try{ localStorage.setItem(key, JSON.stringify(arr)); }catch(e){ /* ignore quota errors*/ }
  }
  function _id(){ return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8); }

  // reports: {id,date,employeeId,role,eventType,notes,photos:[{name,dataUrl}], summary, suggestions}
  function getReports(){ return _loadArray(KEYS.reports); }
  function getReportById(id){
    if(!id) return null;
    const arr = getReports();
    return arr.find(r=>r.id===id) || null;
  }
  function addReport(report){
    const arr = getReports();
    const rec = Object.assign({ id:_id() }, report);
    arr.push(rec);
    _saveArray(KEYS.reports, arr);
    return rec;
  }
  function updateReport(updated){
    if(!updated || !updated.id) return null;
    const arr = getReports();
    const idx = arr.findIndex(r=>r.id===updated.id);
    if(idx===-1) return null;
    arr[idx] = Object.assign({}, arr[idx], updated);
    _saveArray(KEYS.reports, arr);
    return arr[idx];
  }
  function deleteReport(id){
    if(!id) return false;
    const arr = getReports();
    const next = arr.filter(r=>r.id!==id);
    if(next.length === arr.length) return false;
    _saveArray(KEYS.reports, next);
    return true;
  }

  // sales: {id,date,amount,customers}
  function getSales(){ return _loadArray(KEYS.sales); }
  function addSales(sale){
    const arr = getSales();
    const rec = Object.assign({ id:_id() }, sale);
    arr.push(rec);
    _saveArray(KEYS.sales, arr);
    return rec;
  }

  window.appStorage = { getReports, getReportById, addReport, updateReport, deleteReport, getSales, addSales };
})();
