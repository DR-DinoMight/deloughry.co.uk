import styles from '../../styles/Battery.module.css';
import useSWR from "swr";
import {fetcher} from "../../lib/fetcher";
import StatCard from "../StatCard";

const Battery = () => {
  const { data } = useSWR('/api/personal', fetcher);
  const batteryStyles ={
    height: `${data?.battery?.percent || 0}%`,
  }

  let extraBatteryClass = '';
  if (data?.battery?.percent < 25) {
    extraBatteryClass = styles.alert;
  }
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.879 51.879" className="h-4 w-4">
      <path className="fill-white" d="M47.879 19.548h-.981c-.587-3.84-3.895-6.786-7.898-6.786H8a8 8 0 0 0-8 8v10.355a8 8 0 0 0 8 8h31c4.004 0 7.312-2.945 7.898-6.786h.981a4 4 0 0 0 4-4v-4.783a4 4 0 0 0-4-4z"/>
    </svg>
  );

  return (
    <StatCard name="Battery" icon={icon} className={"border-blue"}>
      <div className={`flex gap-4 items-center`}>
        <div className={styles.battery}>
          <div className={`${styles.batteryLevel} ${extraBatteryClass}`} style={batteryStyles}>
          </div>
        </div>
        <div className={"text-2xl"}>
          {data?.battery?.percent}%
        </div>
      </div>
    </StatCard>
  );
};


export default Battery;

