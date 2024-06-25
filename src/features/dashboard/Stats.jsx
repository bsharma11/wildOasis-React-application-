import { HiOutlineBriefcase } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmStays }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmStays.length;
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check-ins"
        value={checkins}
        color="indigo"
      />
    </>
  );
}

export default Stats;
