import { useWeekContext } from "../contexts/WeekNameContext";

function Semaines() {
  const maSemaine = localStorage.getItem("monStockage");
  return (
    <div className="Semaines">
      <p>le nom de la semaine est :{maSemaine}</p>
    </div>
  );
}

export default Semaines;
