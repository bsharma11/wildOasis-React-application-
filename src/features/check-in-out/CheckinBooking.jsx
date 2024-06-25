import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setisconfirmPaid] = useState(false);
  const { booking, isLoading } = useBooking();

  const { settings, isLoading: isLoadingSettings } = useSettings();
  console.log(settings);

  const [addbreakfast, setaddbreakfast] = useState(false);

  useEffect(() => setisconfirmPaid(booking?.isPaid || false), [booking]);
  const moveBack = useMoveBack();

  const { checkin, isCheckingin } = useCheckin();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  // console.log(booking);

  // console.log(settings);
  const optionalBreakfastprice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addbreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastprice,
          totalPrice: totalPrice + optionalBreakfastprice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addbreakfast}
            onChange={() => {
              setaddbreakfast((add) => !add);
              setisconfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {optionalBreakfastprice}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setisconfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || isCheckingin}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addbreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastprice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastprice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          variation="primary"
          size="medium"
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack} size="medium">
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
